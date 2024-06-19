// import Link from '../models/link.js'
// const linkController = {
//     // יצירת לינק חדש
//     createLink: async (req, res) => {
//         try {
//             const link = new Link(req.body);
//             await link.save();
//             res.status(201).send(link);
//         } catch (error) {
//             res.status(400).send(error);
//         }
//     },

//     // קבלת כל הלינקים
//     getAllLinks: async (req, res) => {
//         try {
//             const links = await Link.find({});
//             res.status(200).send(links);
//         } catch (error) {
//             res.status(500).send(error);
//         }
//     },

//     // קבלת לינק לפי ID
//     getLinkById: async (req, res) => {
//         try {
//             const link = await Link.findById(req.params.id);
//             if (!link) {
//                 return res.status(404).send();
//             }
//             res.status(200).send(link);
//         } catch (error) {
//             res.status(500).send(error);
//         }
//     },

//     // עדכון לינק לפי ID
//     updateLinkById: async (req, res) => {
//         const updates = Object.keys(req.body);
//         const allowedUpdates = ['originalUrl'];
//         const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

//         if (!isValidOperation) {
//             return res.status(400).send({ error: 'Invalid updates!' });
//         }

//         try {
//             const link = await Link.findById(req.params.id);
//             if (!link) {
//                 return res.status(404).send();
//             }

//             updates.forEach((update) => link[update] = req.body[update]);
//             await link.save();
//             res.send(link);
//         } catch (error) {
//             res.status(400).send(error);
//         }
//     },

//     // מחיקת לינק לפי ID
//     deleteLinkById: async (req, res) => {
//         try {
//             const link = await Link.findByIdAndDelete(req.params.id);
//             if (!link) {
//                 return res.status(404).send();
//             }
//             res.send(link);
//         } catch (error) {
//             res.status(500).send(error);
//         }
//     },  
//     // הפניה לקישור המקורי ועדכון של קליקים
//     redirectOriginalUrl: async (req, res) => {
//       try {
//         const link = await Link.findById(req.params.id);
  
//         if (!link) {
//           return res.status(404).send('קישור לא נמצא');
//         }
  
//         // לדמות קבלת כתובת IP של הלקוח מכותרות הבקשה
//         const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
//         // לעדכן את מערך ה- clicks
//         link.clicks.push({
//           _id: link.clicks.length,  // יצירת מזהה קליק ייחודי
//           insertedAt: new Date(),
//           ipAddress: ipAddress
//         });
  
//         await link.save();  // לשמור את הקישור שעודכן
  
//         // להפנות לקישור המקורי
//         res.redirect(link.originalUrl);
//       } catch (error) {
//         console.error(error);
//         res.status(500).send('שגיאת שרת');
//       }
//     }
//   };
  
// // module.exports = linkController;
// export default linkController;
import Link from '../models/link.js';

const linkController = {
  // יצירת לינק חדש
  createLink: async (req, res) => {
    try {
      const link = new Link(req.body);
      await link.save();
      res.status(201).send(link);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // קבלת כל הלינקים
  getAllLinks: async (req, res) => {
    try {
      const links = await Link.find({});
      res.status(200).send(links);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // קבלת לינק לפי ID
  getLinkById: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);
      if (!link) {
        return res.status(404).send();
      }
      res.status(200).send(link);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // עדכון לינק לפי ID
  updateLinkById: async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['originalUrl', 'targetParamName', 'targetValues']; // הוספת 'targetParamName', 'targetValues'
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    // if (!isValidOperation) {
    //   return res.status(400).send({ error: 'Invalid updates!' });
    // }

    try {
      const link = await Link.findById(req.params.id);
      if (!link) {
        return res.status(404).send();
      }

      updates.forEach((update) => link[update] = req.body[update]);
      await link.save();
      res.send(link);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // מחיקת לינק לפי ID
  deleteLinkById: async (req, res) => {
    try {
      const link = await Link.findByIdAndDelete(req.params.id);
      if (!link) {
        return res.status(404).send();
      }
      res.send(link);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // הפניה לקישור המקורי ועדכון של קליקים
  redirectOriginalUrl: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);

      if (!link) {
        return res.status(404).send('קישור לא נמצא');
      }

      // בדיקה האם קיים פרמטר ממוקד ב-query string
      const targetParamName = link.targetParamName;
      const targetParamValue = req.query[targetParamName]; // קבלת ערך הפרמטר מה-query string

      // אם קיים פרמטר ממוקד, נעדכן את ה-clicks עם הערך שלו
      if (targetParamValue) {
        link.clicks.push({
          _id: link.clicks.length,
          insertedAt: new Date(),
          ipAddress: req.ip,
          targetParamValue: targetParamValue  // שמירת ערך הפרמטר הממוקד ב-click
        });

        await link.save();
      }

      // הפניה לקישור המקורי
      res.redirect(link.originalUrl);
    } catch (error) {
      console.error(error);
      res.status(500).send('שגיאת שרת');
    }
  },

  // קבלת נתוני קליקים לפי מקורות שונים
  getLinkClicksBySource: async (req, res) => {
    try {
      const linkId = req.params.id;
      const link = await Link.findById(linkId);
      if (!link) {
        return res.status(404).send('קישור לא נמצא');
      }

      const clicks = link.clicks;
      const clicksBySource = {};

      // קבץ את הקליקים לפי הערכים של targetValues
      link.targetValues.forEach(target => {
        clicksBySource[target.value] = clicks.filter(click => click.targetParamValue === target.value);
      });

      res.status(200).send(clicksBySource);
    } catch (error) {
      console.error(error);
      res.status(500).send('שגיאת שרת');
    }
  }
};

export default linkController;
