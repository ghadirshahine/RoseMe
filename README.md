# ورود الجنة

متجر ورد عربي باتجاه RTL مبني باستخدام Next.js App Router وTypeScript وTailwind CSS، مع Sanity Studio مستقل في مجلد `studio`. الواجهة تعمل بمحتوى تجريبي عند عدم إعداد Sanity، ولا تنشئ أو تنشر مشروع Sanity نيابة عنك.

## المتطلبات

- Windows 10/11 بنظام 64-bit.
- Node.js 20.9 أو أحدث (المشروع جُرّب على Node.js 24) وnpm.
- حساب Sanity لإنشاء المشروع والـdataset ودعوة المحررين.

## التشغيل المحلي على Windows

من PowerShell داخل مجلد المشروع:

```powershell
npm install
Copy-Item .env.example .env.local
npm install --prefix studio
```

عدّل `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=e4p57v4g
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-01
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Server-only: رمز قراءة أو ما يساويه في الاسم القديم
SANITY_API_READ_TOKEN=رمز-قراءة-خاص-لخادم-الموقع
SANITY_API_TOKEN=رمز-قراءة-خاص-لخادم-الموقع
```

لأن الـdataset خاص، أنشئ في Sanity API token بصلاحية قراءة فقط، وضعه في `SANITY_API_READ_TOKEN` محليًا وفي إعدادات Vercel. يدعم المشروع أيضًا الاسم القديم `SANITY_API_TOKEN` للحفاظ على التوافق. يُستخدم الرمز حصريًا في وحدة خادمية، ولا يُرسل إلى المتصفح. لا تستخدم رمز Editor أو Admin للموقع العام.

شغّل الموقع:

```powershell
npm run dev
```

افتح `http://localhost:3000`. من دون `NEXT_PUBLIC_SANITY_PROJECT_ID` يعرض الموقع محتوى تجريبيًا. لا تضع token في متغير `NEXT_PUBLIC_*` أو في Git. لا يحتاج الطلب المحلي عبر WhatsApp إلى token.

## Sanity Studio

Sanity Studio تطبيق مستقل في `studio/` ولا يُضمّن داخل تطبيق Next.js. يستخدم المشروع `e4p57v4g` وdataset باسم `production`. سجّل الدخول بحساب Sanity عند أول تشغيل.

1. إعداد Next.js موجود في `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID=e4p57v4g` و`NEXT_PUBLIC_SANITY_DATASET=production`).
2. أضف أصول CORS المحلية إلى المشروع:

   ```powershell
   Push-Location studio
   npx sanity cors add http://localhost:3000 --credentials
   npx sanity cors add http://localhost:3333 --credentials
   Pop-Location
   ```

3. شغّل Next.js وStudio كلًا على حدة:

   ```powershell
   npm run dev
   npm run studio:dev
   ```

   افتح الموقع على `http://localhost:3000` والاستوديو على `http://localhost:3333`. أوامر `studio:build` و`studio:deploy` تبني وتنشر الاستوديو منفصلًا.

لـdataset خاص، أنشئ رمز قراءة فقط للموقع وضعه في `SANITY_API_TOKEN` محليًا وفي إعدادات Vercel. يُستخدم الرمز على الخادم فقط؛ لا تضعه في متغير `NEXT_PUBLIC_*`.
### دعوات وصلاحيات الفريق

من **Sanity Manage → Members/Access**:

- ادعُ مالك المتجر بحساب Admin/Owner المناسب لمشروعك.
- ادعُ حسابات الفريق البريدية بدور Editor بأقل صلاحيات تسمح بها الخطة.
- اختبر بحساب Editor أنه يستطيع إنشاء وتعديل ونشر المستندات المطلوبة، وأنه لا يستطيع إدارة المشروع أو إعدادات الأمان.
- صلاحيات الأدوار الدقيقة، وإمكانية تقييدها حسب نوع المستند، تعتمد على خطة Sanity وإعدادات المشروع. لا تعتبر إخفاء مستندات أو أقسام من واجهة Studio حماية أمنية. إذا لم توفر الخطة أدوارًا مخصصة، فلا يمكن ضمان تقييد الكتابة إلى أنواع بعينها بمجرد تعديل واجهة الاستوديو.

لا يستطيع هذا المستودع إرسال الدعوات أو إنشاء الأدوار بدلًا عن مالك المشروع.

## المحتوى

تُعرّف schemas في `studio/schemaTypes/`:

- **إعدادات الموقع**: مستند singleton للعنوان والوصف والهاتف والصورة والألوان ومعلومات التواصل.
- **التصنيفات**: عنوان ورابط ووصف وصورة.
- **المنتجات**: صور وأوصاف وسعر وتصنيف ووسوم وأحجام وتغليف وبطاقة وبيانات SEO والتوفر.

أنشئ مستند إعدادات الموقع من قسم «إعدادات الموقع» في Studio، ثم أضف التصنيفات والمنتجات. يستعلم الموقع عن المنتجات المتاحة والتصنيفات والمنتجات المميزة والمنتج حسب الرابط باستخدام GROQ في `src/lib/sanity/queries.ts`.

## الطلبات والتواصل

- سلة المشتريات تُحفظ محليًا في متصفح الزائر (`localStorage`).
- الدفع غير مفعّل؛ الطلبات تُرسل إلى WhatsApp بعد مراجعة التفاصيل. أكّد أجور التوصيل وتوفر المنتجات يدويًا قبل الطلب.
- نموذج التواصل يفتح WhatsApp برسالة جاهزة ولا يخزّن بيانات العميل أو يرسلها إلى خادم.
- لا تُخزّن بيانات العملاء أو الطلبات في dataset من الواجهة الأمامية.

## الفحص والبناء

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

## النشر على Vercel

1. ارفع المستودع إلى GitHub واستورده من [Vercel](https://vercel.com/new).
2. أضف المتغيرات في **Project Settings → Environment Variables** لبيئات Production وPreview حسب الحاجة:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_BASE_URL` بعنوان الموقع النهائي مثل `https://example.com`
   - `SANITY_API_TOKEN` رمز قراءة فقط للـdataset الخاص، ويظل server-only؛ لا تستخدم رمزًا بصلاحية كتابة.
3. أمر البناء هو `npm run build`، ومجلد الإخراج يُدار بواسطة Next.js. لا تستخدم `next export` مع إعداد النشر هذا.
4. أضف أصل CORS بعنوان الموقع النهائي وأصول Preview التي تحتاجها إلى إعدادات Sanity. أعد النشر بعد تغيير المتغيرات.
5. انشر Studio على حدة باستخدام `npm run studio:deploy`، ثم افتح رابط Studio الناتج وسجّل الدخول. أضف أصل الموقع المنشور إلى CORS في Sanity.

روابط مرجعية:

- [Sanity مع Next.js](https://www.sanity.io/docs/nextjs)
- [البدء مع Sanity](https://www.sanity.io/docs/get-started)
- [أدوار مستخدمي Sanity](https://www.sanity.io/docs/user-roles)
- [نشر Sanity Studio](https://www.sanity.io/docs/deployment)
- [متغيرات البيئة في Vercel](https://vercel.com/docs/projects/environment-variables)
- [نشر Next.js على Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Shadcn UI مع Next.js](https://ui.shadcn.com/docs/installation/next)
