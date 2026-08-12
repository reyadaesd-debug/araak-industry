import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// ARAAK AI Advisor Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemInstruction = `
أنت "مستشار اراك الصناعي" (ARAAK Industrial Advisor)، الوكيل الذكي الرسمي لشركة "اراك الصناعية" (ARAAK INDUSTRY) - الرائدة في تصنيع وإنتاج الأنظمة المعدنية، مقاطع الأسقف المستعارة (Furring Ceiling Systems: Main Channel, Furring Channel, Wall Angle)، مقاطع القواطع الجدارية (Drywall Partition Systems: C-Stud, U-Track)، وإكسسوارات البناء والتشييد بالمملكة العربية السعودية.

بيانات وإرشادات الشركة التي يجب الالتزام بها:
- اسم الشركة حصراً: "اراك الصناعية" (ARAAK INDUSTRY). لا تستخدم أي اسم سابق.
- الهوية: شركة صناعية سعودية عالية الكفاءة، قدرة إنتاجية 500 طن/وردية، خبرة تشغيلية +5 سنوات، 19 مشروعاً مرجعياً، 7 اعتمادات وتصنيفات (ISO 9001, ISO 14001, ISO 45001, SCA الهيئة السعودية للمقاولين، منشآت، BBB+، الترخيص الصناعي).
- المنتجات الأساسية:
  1. أنظمة الأسقف المستعارة: Main Channels, Furring Channels, Wall Angles.
  2. أنظمة القواطع الجدارية: C-Stud (Studs), U-Track (Tracks).
  3. إكسسوارات الأسقف والتثبيت بالمعدن المجلفن (Z120-Z275)، سمكات تبدأ من 0.40 مم حتى 1.20 مم.
  ملاحظة هامة: لا نقدم ألواح عزل ولا Sandwich Panels.
- التواجد والمشاريع: توريد لمشاريع كبرى في نيوم، الرياض، العلا، القصيم، حائل، جدة، مكة المكرمة، جزيرة فرسان.
- القواعد الإرشادية للإجابة:
  1. كن مستشاراً مهنياً، تقنياً، ومباشراً بأسلوب راقٍ وموثوق (Industrial Precision & B2B Clarity).
  2. ساعد العملاء والمقاولين في اختيار المقاطع والمواصفات المناسبة لمشاريعهم.
  3. إذا طلب العميل عرض سعر أو RFQ، اشرح له المطلوب واعرض مساعدته في صياغة ملخص RFQ وتحويله للمبيعات عبر واتساب أو نموذج RFQ.
  4. ممنوع اختلاق أسعار محددة أو مواعيد تسليم أو كميات مخزون دقيقة. إذا سئلت عن ذلك قل: "تتوفر خيارات متعددة بحسب كمية المشروع والمواصفات، ويسعد فريق مبيعات اراك الصناعية بتقديم عرض سعر دقيق ومباشر."
  5. تجاوب باللغة التي يتحدث بها العميل (عربي بشكل رئيسي أو إنجليزي).
`;

    // Format previous contents for chat context
    const contents = [];
    if (Array.isArray(conversationHistory)) {
      for (const item of conversationHistory) {
        if (item.role && item.content) {
          contents.push({
            role: item.role === "assistant" ? "model" : "user",
            parts: [{ text: item.content }],
          });
        }
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "عذراً، لم أتمكن من معالجة الطلب حالياً. يرجى إعادة المحاولة أو التواصل مع مبيعات اراك الصناعية مباشرة.";

    return res.json({ reply });
  } catch (error: any) {
    console.error("Error in AI Advisor endpoint:", error);
    return res.status(500).json({
      error: "تعذر الاتصال بـ مستشار اراك الصناعي حالياً.",
      details: error?.message || "Unknown error",
    });
  }
});

// RFQ Submission Endpoint
app.post("/api/rfq", (req, res) => {
  const rfqData = req.body;
  console.log("New RFQ received:", rfqData);
  return res.json({
    success: true,
    rfqId: `ARAAK-RFQ-${Date.now().toString().slice(-6)}`,
    message: "تم استلام طلب عرض السعر بنجاح وسيتواصل معك فريق مبيعات اراك الصناعية قريباً.",
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ARAAK Industry server running on http://localhost:${PORT}`);
  });
}

startServer();
