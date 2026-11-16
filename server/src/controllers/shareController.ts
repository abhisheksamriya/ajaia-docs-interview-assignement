import type { Request, Response } from 'express';
import { DocumentModel } from '../models/Document.js';

export const shareDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { targetUserId } = req.body;

    if (!targetUserId) {
      return res.status(400).json({ success: false, error: 'targetUserId is required' });
    }

    const doc = await DocumentModel.findById(id);
    if (!doc) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }

    if (!doc.sharedWith.includes(targetUserId)) {
      doc.sharedWith.push(targetUserId);
      await doc.save();
    }

    res.status(200).json({ success: true, message: 'Document shared successfully', data: doc });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};