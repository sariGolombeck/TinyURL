

import express from 'express';
import linkController from '../controllers/linkController.js';

const router = express.Router();

// יצירת לינק חדש
router.post('/links', linkController.createLink);

// קבלת כל הלינקים
router.get('/links', linkController.getAllLinks);

// קבלת לינק לפי ID
router.get('/links/:id', linkController.getLinkById);

// עדכון לינק לפי ID
router.patch('/links/:id', linkController.updateLinkById);

// מחיקת לינק לפי ID
router.delete('/links/:id', linkController.deleteLinkById);

// הפניה לקישור המקורי ועדכון של קליקים
router.get('/redirect/:id', linkController.redirectOriginalUrl);

// קבלת נתוני קליקים לפי מקורות שונים
router.get('/links/:id/clicksBySource', linkController.getLinkClicksBySource);

export default router;
