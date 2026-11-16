import type { Request, Response } from 'express';
import fs from 'fs';
import { DocumentModel } from '../models/Document.js';

// create new document
export const createDocument = async (req: Request, res: Response) => {
  try {
    const { title, ownerId, content } = req.body;
    const newDoc = await DocumentModel.create({
      title: title || 'Untitled Document',
      content: content || '',
      ownerId: ownerId || 'user_1'
    });
    res.status(201).json({ success: true, data: newDoc });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// get all the documents
export const getDocuments = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'userId query parameter is required' });
    }

    const docs = await DocumentModel.find({
      $or: [
        { ownerId: userId },
        { sharedWith: userId }
      ]
    } as any).sort({ updatedAt: -1 });

    res.status(200).json({ success: true, data: docs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// get document by id
export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const doc = await DocumentModel.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// update document
export const updateDocument = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const updated = await DocumentModel.findByIdAndUpdate(
      req.params.id,
      { title, content, updatedAt: new Date() },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// delete document
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const deleted = await DocumentModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }
    res.status(200).json({ success: true, message: 'Document deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const uploadAndImportFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileContent = req.file.buffer.toString('utf-8');
    const fileName = req.file.originalname;
    const userId = req.body.userId || 'user_1';

    const newDoc = await DocumentModel.create({
      title: fileName.replace(/\.[^/.]+$/, ""), 
      content: fileContent,
      ownerId: userId
    });

    res.status(201).json(newDoc);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};