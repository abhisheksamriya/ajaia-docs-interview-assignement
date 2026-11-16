import { Router } from 'express';
import multer from 'multer';
import { 
  createDocument, 
  getDocuments, 
  getDocumentById, 
  updateDocument, 
  deleteDocument, 
  uploadAndImportFile 
} from '../controllers/docController.js';
import { shareDocument } from '../controllers/shareController.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//routes

router.post('/', createDocument);
router.get('/', getDocuments);
router.get('/:id', getDocumentById);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

// file import route
router.post('/upload', upload.single('file'), uploadAndImportFile);

// sharing route
router.post('/:id/share', shareDocument);

export default router;