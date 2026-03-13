import { X, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ContactModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly employeeName: string;
  readonly employeeId: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  employeeName,
  employeeId,
}: ContactModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    dataToCorrect: '',
    reason: '',
  });
  // BUG-06 fix: custom validation state with Thai messages
  const [errors, setErrors] = useState<{ dataToCorrect?: string; reason?: string }>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: { dataToCorrect?: string; reason?: string } = {};

    if (!formData.dataToCorrect.trim()) {
      newErrors.dataToCorrect = 'กรุณาระบุข้อมูลที่ต้องการแก้ไข';
    }
    if (!formData.reason.trim()) {
      newErrors.reason = 'กรุณาระบุเหตุผลในการแก้ไข';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log('Submitting correction request:', {
      employeeName,
      employeeId,
      dataToCorrect: formData.dataToCorrect.trim(),
      reason: formData.reason.trim(),
    });
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({ dataToCorrect: '', reason: '' });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl md:rounded-[32px] shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto animate-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-[#FFCC00] p-4 md:p-6 lg:p-8 relative border-b-4 border-[#D40511]">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 p-2 hover:bg-black/10 rounded-full transition-colors"
          >
            <X size={20} className="md:w-6 md:h-6 text-gray-900" />
          </button>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 uppercase italic tracking-tighter pr-10 md:pr-12">
            แจ้งแก้ไขข้อมูล
          </h2>
          <p className="text-gray-700 font-bold text-xs md:text-sm mt-1">Request Data Correction</p>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 lg:p-8">
          {isSubmitted ? (
            // Success State
            <div className="text-center py-6 md:py-8 space-y-4 md:space-y-6 animate-in zoom-in duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={40} className="md:w-12 md:h-12 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 uppercase italic">
                  ส่งคำขอสำเร็จ!
                </h3>
                <p className="text-sm md:text-base text-gray-600 font-bold px-2">
                  คำขอแก้ไขข้อมูลของคุณถูกส่งแล้ว
                  <br />
                  กรุณารอการตรวจสอบจาก HR Department
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 text-left space-y-3">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    ข้อมูลที่แก้ไข
                  </p>
                  <p className="text-sm font-bold text-gray-800 mt-1">{formData.dataToCorrect}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    เหตุผล
                  </p>
                  <p className="text-sm font-bold text-gray-800 mt-1">{formData.reason}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-full bg-gray-900 hover:bg-[#D40511] text-[#FFCC00] font-black py-4 rounded-2xl transition-all uppercase italic tracking-widest text-sm shadow-lg"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4 md:space-y-6">
              {/* Employee Info (Read-only) */}
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-5 border border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Employee Name
                    </p>
                    <p className="font-black text-gray-900 mt-1">{employeeName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Employee ID
                    </p>
                    <p className="font-black text-gray-900 mt-1">{employeeId}</p>
                  </div>
                </div>
              </div>

              {/* Data to Correct */}
              <div className="space-y-2">
                <label
                  htmlFor="dataToCorrect"
                  className="block text-sm font-black text-gray-700 uppercase tracking-wide"
                >
                  ข้อมูลที่ต้องการแก้ไข <span className="text-[#D40511]">*</span>
                </label>
                <textarea
                  id="dataToCorrect"
                  value={formData.dataToCorrect}
                  onChange={(e) => {
                    setFormData({ ...formData, dataToCorrect: e.target.value });
                    if (errors.dataToCorrect) {
                      setErrors({ ...errors, dataToCorrect: undefined });
                    }
                  }}
                  inputMode="text"
                  autoCapitalize="sentences"
                  className={`w-full px-4 py-3 md:px-5 md:py-4 bg-gray-50 border-2 ${
                    errors.dataToCorrect
                      ? 'border-[#D40511] bg-red-50/30'
                      : 'border-gray-200 focus:border-[#FFCC00]'
                  } rounded-xl focus:bg-white outline-none transition-all text-sm md:text-base resize-none`}
                  rows={3}
                  placeholder="ระบุข้อมูลที่ต้องการแก้ไข เช่น ชื่อ-นามสกุล, แผนก, ตำแหน่ง..."
                />
                {errors.dataToCorrect && (
                  <p className="text-[#D40511] font-bold text-xs">{errors.dataToCorrect}</p>
                )}
              </div>

              {/* Reason */}
              <div className="space-y-2">
                <label
                  htmlFor="reason"
                  className="block text-sm font-black text-gray-700 uppercase tracking-wide"
                >
                  เหตุผลในการแก้ไข <span className="text-[#D40511]">*</span>
                </label>
                <textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => {
                    setFormData({ ...formData, reason: e.target.value });
                    if (errors.reason) {
                      setErrors({ ...errors, reason: undefined });
                    }
                  }}
                  inputMode="text"
                  autoCapitalize="sentences"
                  className={`w-full px-4 py-3 md:px-5 md:py-4 bg-gray-50 border-2 ${
                    errors.reason
                      ? 'border-[#D40511] bg-red-50/30'
                      : 'border-gray-200 focus:border-[#FFCC00]'
                  } rounded-xl focus:bg-white outline-none transition-all text-sm md:text-base resize-none`}
                  rows={3}
                  placeholder="โปรดระบุเหตุผลที่ต้องการแก้ไขข้อมูล..."
                />
                {errors.reason && (
                  <p className="text-[#D40511] font-bold text-xs">{errors.reason}</p>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-blue-50/50 border-l-4 border-blue-500 p-5 rounded-xl">
                <p className="text-sm text-gray-700 font-bold">
                  <span className="font-black text-gray-900">หมายเหตุ:</span>{' '}
                  คำขอแก้ไขข้อมูลจะถูกส่งไปยัง HR Department เพื่อพิจารณา ระยะเวลาประมวลผล 1-2
                  วันทำการ
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#D40511] hover:bg-[#b0040e] text-[#FFCC00] font-black py-3 md:py-4 rounded-xl md:rounded-2xl transition-all uppercase italic tracking-widest text-sm md:text-base shadow-lg flex items-center justify-center gap-2 md:gap-3"
              >
                <Send size={18} className="md:w-5 md:h-5" />
                ส่งคำขอแก้ไข
              </button>
            </form>
          )}
        </div>

        {/* Bottom Branding */}
        <div className="bg-gray-50 py-4 text-center border-t border-gray-100">
          <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">
            All System Corporation Co.,Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}
