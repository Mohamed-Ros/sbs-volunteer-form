
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Form = ({ addSubmission }) => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    gender: '',
    age: '',
    educationType: '',
    studyYear: '',
    schoolUniversity: '',
    fieldOfStudy: '',
    socialMediaLinks: '',
    whatsappNumber: '',
    governorate: '',
    aboutYou: '',
    teamExperience: '',
    generalExperience: '',
    driveLink: '',
    strengths: '',
    weaknesses: '',
    followDuration: '',
    volunteerReason: '',
    hoursPerDay: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    // Required fields except driveLink
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'driveLink' && !value) {
        newErrors[key] = 'هذا الحقل مطلوب';
      }
    });
    // WhatsApp validation
    if (formData.whatsappNumber && !/^\+20\d{10}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'يجب أن يبدأ الرقم بـ +20 ويحتوي على 12 رقمًا إجمالاً';
    }
    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }
    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setErrors({});

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbz9Fwstl7UYPxRjMKFfAd79E0VqpH8Uz8VyEe9WINPecOyueCYUD8kdwpBmWZ4an9kB/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(formData),
    });

    const text = await response.json();

    // استخدم sweetalert لعرض رسالة النجاح
    Swal.fire({
      icon: 'success',
      title: 'نجاح',
      text: text.message,  // "تم استلام البيانات"
      confirmButtonText: 'حسناً'
    });

    // تفريغ الفورم
    setFormData({
      email: '',
      fullName: '',
      gender: '',
      age: '',
      educationType: '',
      studyYear: '',
      schoolUniversity: '',
      fieldOfStudy: '',
      socialMediaLinks: '',
      whatsappNumber: '',
      governorate: '',
      aboutYou: '',
      teamExperience: '',
      generalExperience: '',
      driveLink: '',
      strengths: '',
      weaknesses: '',
      followDuration: '',
      volunteerReason: '',
      hoursPerDay: '',
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'خطأ',
      text: 'حدث خطأ أثناء إرسال البيانات، حاول مرة أخرى.',
      confirmButtonText: 'حسناً'
    });
    console.error('Error:', error);
  }
};

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <div className="flex justify-center mb-6">
          <img src="https://i.ibb.co/3yDZTSfF/sbs-logo.webp" alt="SBS Logo" className="w-32" />
        </div>
  <h2 className="text-2xl font-bold text-center mb-6">استمارة تسجيل متطوعين شباب بتساعد شباب (SBS)</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">اسمك الثلاثي</label>
              <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">النوع</label>
              <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                <option value="">اختر...</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
                <option value="Other">أخرى</option>
              </select>
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">السن</label>
              <select name="age" id="age" value={formData.age} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                <option value="">اختر...</option>
                <option value="14-23">14-23</option>
                <option value="Other">أخرى</option>
              </select>
            </div>
            <div>
              <label htmlFor="educationType" className="block text-sm font-medium text-gray-700">نوع التعليم</label>
              <select name="educationType" id="educationType" value={formData.educationType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {errors.educationType && <p className="text-red-500 text-xs mt-1">{errors.educationType}</p>}
                <option value="">اختر...</option>
                <option value="ثانوي عام">ثانوي عام</option>
                <option value="ثانوي Stem">ثانوي Stem</option>
                <option value="جامعة حكومية">جامعة حكومية</option>
                <option value="جامعة خاصة">جامعة خاصة</option>
                <option value="جامعة أهلية">جامعة أهلية</option>
                <option value="جامعة دولية">جامعة دولية</option>
                <option value="Other">أخرى</option>
              </select>
            </div>
            <div>
              <label htmlFor="studyYear" className="block text-sm font-medium text-gray-700">أنت حاليا في سنة كام؟</label>
              <select name="studyYear" id="studyYear" value={formData.studyYear} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {errors.studyYear && <p className="text-red-500 text-xs mt-1">{errors.studyYear}</p>}
                <option value="">اختر...</option>
                <option value="أولي ثانوي">أولي ثانوي</option>
                <option value="ثانية ثانوي">ثانية ثانوي</option>
                <option value="أولي جامعة">أولي جامعة</option>
                <option value="ثانية جامعة">ثانية جامعة</option>
                <option value="ثالثة جامعة">ثالثة جامعة</option>
                <option value="رابعة جامعة">رابعة جامعة</option>
                <option value="متخرج">متخرج</option>
                <option value="Other">أخرى</option>
              </select>
            </div>
            <div>
              <label htmlFor="schoolUniversity" className="block text-sm font-medium text-gray-700">اسم المدرسة / الجامعة</label>
              <input type="text" name="schoolUniversity" id="schoolUniversity" value={formData.schoolUniversity} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.schoolUniversity && <p className="text-red-500 text-xs mt-1">{errors.schoolUniversity}</p>}
            </div>
            <div>
              <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700">مجال دراستك</label>
              <input type="text" name="fieldOfStudy" id="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.fieldOfStudy && <p className="text-red-500 text-xs mt-1">{errors.fieldOfStudy}</p>}
            </div>
            <div>
              <label htmlFor="socialMediaLinks" className="block text-sm font-medium text-gray-700">روابط السوشيال ميديا (لينكدإن / فيسبوك / لينك تري)</label>
              <input type="text" name="socialMediaLinks" id="socialMediaLinks" value={formData.socialMediaLinks} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.socialMediaLinks && <p className="text-red-500 text-xs mt-1">{errors.socialMediaLinks}</p>}
            </div>
            <div>
              <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">رقم الواتساب</label>
              <input
                type="text"
                name="whatsappNumber"
                id="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={e => {
                  // Allow only + and digits
                  let v = e.target.value;
                  if (v === '' || v === '+') {
                    handleChange(e);
                  } else {
                    v = v.replace(/[^\d+]/g, '');
                    // Only allow + at the start
                    if (v.startsWith('+')) {
                      v = '+' + v.slice(1).replace(/[^\d]/g, '');
                    } else {
                      v = v.replace(/[^\d]/g, '');
                    }
                    handleChange({ target: { name: 'whatsappNumber', value: v } });
                  }
                }}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.whatsappNumber && <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber}</p>}
            </div>
            <div>
              <label htmlFor="governorate" className="block text-sm font-medium text-gray-700">المحافظة</label>
              <input type="text" name="governorate" id="governorate" value={formData.governorate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.governorate && <p className="text-red-500 text-xs mt-1">{errors.governorate}</p>}
            </div>
            <div>
              <label htmlFor="aboutYou" className="block text-sm font-medium text-gray-700">اتكلم عن نفسك...</label>
              <textarea name="aboutYou" id="aboutYou" value={formData.aboutYou} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              {errors.aboutYou && <p className="text-red-500 text-xs mt-1">{errors.aboutYou}</p>}
            </div>
            <div>
              <label htmlFor="teamExperience" className="block text-sm font-medium text-gray-700">هل لديك خبرة سابقة في الفريق المختار؟</label>
              <textarea name="teamExperience" id="teamExperience" value={formData.teamExperience} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              {errors.teamExperience && <p className="text-red-500 text-xs mt-1">{errors.teamExperience}</p>}
            </div>
            <div>
              <label htmlFor="generalExperience" className="block text-sm font-medium text-gray-700">هل لديك خبرة عامة في العمل التطوعي؟</label>
              <textarea name="generalExperience" id="generalExperience" value={formData.generalExperience} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              {errors.generalExperience && <p className="text-red-500 text-xs mt-1">{errors.generalExperience}</p>}
            </div>
            <div>
              <label htmlFor="driveLink" className="block text-sm font-medium text-gray-700">رابط Google Drive لأعمالك السابقة (اختياري)</label>
              <input type="text" name="driveLink" id="driveLink" value={formData.driveLink} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="strengths" className="block text-sm font-medium text-gray-700">مميزاتك</label>
              <textarea name="strengths" id="strengths" value={formData.strengths} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              {errors.strengths && <p className="text-red-500 text-xs mt-1">{errors.strengths}</p>}
            </div>
            <div>
              <label htmlFor="weaknesses" className="block text-sm font-medium text-gray-700">عيوبك</label>
              <textarea name="weaknesses" id="weaknesses" value={formData.weaknesses} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              {errors.weaknesses && <p className="text-red-500 text-xs mt-1">{errors.weaknesses}</p>}
            </div>
            <div>
              <label htmlFor="followDuration" className="block text-sm font-medium text-gray-700">من متى تتابع شباب بتساعد شباب</label>
              <input type="text" name="followDuration" id="followDuration" value={formData.followDuration} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.followDuration && <p className="text-red-500 text-xs mt-1">{errors.followDuration}</p>}
            </div>
            <div>
              <label htmlFor="volunteerReason" className="block text-sm font-medium text-gray-700">لماذا تريد التطوع مع شباب بتساعد شباب</label>
              <textarea name="volunteerReason" id="volunteerReason" value={formData.volunteerReason} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              {errors.volunteerReason && <p className="text-red-500 text-xs mt-1">{errors.volunteerReason}</p>}
            </div>
            <div>
              <label htmlFor="hoursPerDay" className="block text-sm font-medium text-gray-700">كم وقت سوفه تعطيه لشباب بتساعد شباب</label>
              <select name="hoursPerDay" id="hoursPerDay" value={formData.hoursPerDay} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {errors.hoursPerDay && <p className="text-red-500 text-xs mt-1">{errors.hoursPerDay}</p>}
                <option value="">اختر...</option>
                <option value="1">ساعة واحدة</option>
                <option value="2">ساعتان</option>
                <option value="3">ثلاث ساعات</option>
                <option value="4">أربع ساعات</option>
              </select>
            </div>

          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              إرسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
