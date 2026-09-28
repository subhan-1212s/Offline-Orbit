import React, { useState } from 'react';
import { 
  X, Check, Star, ShieldCheck, Tag, CreditCard, Smartphone, 
  Building2, Lock, Download, CheckCircle2, Award, BookOpen, Clock, Sparkles 
} from 'lucide-react';

export const UdemyCourseCheckoutModal = ({ isOpen, onClose, courseItem, onPurchaseSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'paytm'
  const [couponCode, setCouponCode] = useState('OFFLINE85');
  const [couponApplied, setCouponApplied] = useState(true);
  const [loading, setLoading] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(null);

  if (!isOpen) return null;

  const item = courseItem || {
    id: 'stem-curriculum-bundle',
    title: 'Complete STEM Curriculum & Diagnostic Toolkit for Educators',
    subtitle: 'Master offline classroom management, automated Bloom\'s taxonomy diagnostics, and multilingual audio lessons.',
    instructor: 'Dr. Sarah Vance, Senior STEM Pedagogist',
    rating: 4.9,
    ratingCount: '2,480 ratings',
    studentsCount: '14,350 educators',
    originalPrice: 3499,
    discountPrice: 499,
    bestseller: true,
    features: [
      'Full Lifetime Access to 150+ Offline STEM Question Banks',
      'Downloadable Animated WebM Video Lesson Packs (~400KB)',
      'Automated Diagnostic Misconception PDF Report Card Generator',
      '6-Digit Classroom Code Telemetry & Live Chat',
      'Official Certificate of Completion for School Accreditation'
    ]
  };

  const currentPrice = couponApplied ? item.discountPrice : item.originalPrice;
  const savings = item.originalPrice - currentPrice;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'OFFLINE85' || couponCode.trim().toUpperCase() === 'HACKATHON2026') {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code. Try OFFLINE85 for 85% discount.');
    }
  };

  const handleCompletePayment = () => {
    setLoading(true);

    setTimeout(() => {
      const now = new Date();
      const receipt = {
        orderId: `UDE_ORBIT_${Date.now().toString().slice(-8)}`,
        txnId: `TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        itemTitle: item.title,
        amountPaid: `₹${currentPrice}`,
        paymentMethod: paymentMethod.toUpperCase(),
        date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        instructor: item.instructor
      };

      try {
        const existingPurchases = JSON.parse(localStorage.getItem('orbit_educator_purchases') || '[]');
        localStorage.setItem('orbit_educator_purchases', JSON.stringify([item.id, ...existingPurchases]));
      } catch (e) {}

      setPurchaseCompleted(receipt);
      if (onPurchaseSuccess) onPurchaseSuccess(item, receipt);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-[#E5E2DA] relative">
        
        {/* Udemy Signature Header */}
        <div className="bg-[#2D2F31] text-white p-5 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#A435F0] text-white font-extrabold text-lg flex items-center justify-center shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#ECEB98] uppercase tracking-wider block">
                Educator In-App Checkout
              </span>
              <h3 className="font-extrabold text-base text-white leading-tight">
                Toolkit & Institutional Accreditation Enrollment
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!purchaseCompleted ? (
          /* Checkout View */
          <div className="p-6 space-y-6">
            
            {/* Course Summary Card */}
            <div className="bg-[#F7F9FA] border border-[#E5E2DA] p-4 sm:p-5 rounded-2xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                {item.bestseller && (
                  <span className="bg-[#ECEB98] text-[#2D2F31] text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                    Bestseller
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs text-[#B4690E] font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#B4690E]" />
                  <span>{item.rating}</span>
                  <span className="text-[#6A6F73] font-normal">({item.ratingCount})</span>
                </div>
              </div>

              <div>
                <h4 className="font-black text-base text-[#2D2F31] leading-snug">{item.title}</h4>
                <p className="text-xs text-[#6A6F73] mt-1">{item.subtitle}</p>
                <span className="text-[11px] font-semibold text-[#2D2F31] block mt-1">Created by {item.instructor}</span>
              </div>

              {/* Price & Savings Display */}
              <div className="pt-2 border-t border-[#E5E2DA] flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#2D2F31]">₹{currentPrice}</span>
                  <span className="text-xs text-[#6A6F73] line-through font-semibold">₹{item.originalPrice}</span>
                  {couponApplied && (
                    <span className="text-xs font-black text-[#8710D8]">86% off</span>
                  )}
                </div>
                <span className="text-[11px] font-extrabold text-[#B4690E] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 2 days left at this price!
                </span>
              </div>
            </div>

            {/* Included Features Checklist */}
            <div className="space-y-1.5 text-xs text-[#2D2F31]">
              <span className="font-bold text-[11px] text-[#6A6F73] uppercase tracking-wider block mb-1">This in-app upgrade includes:</span>
              {item.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="leading-snug">{f}</span>
                </div>
              ))}
            </div>

            {/* Payment Method Selector (Udemy Style) */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-black text-[#2D2F31] uppercase tracking-wider block">
                Select Payment Method
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === 'upi' ? 'border-[#A435F0] bg-[#A435F0]/10 text-[#A435F0]' : 'border-[#E5E2DA] text-[#6A6F73] hover:bg-gray-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === 'card' ? 'border-[#A435F0] bg-[#A435F0]/10 text-[#A435F0]' : 'border-[#E5E2DA] text-[#6A6F73] hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paytm')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === 'paytm' ? 'border-[#00B9F1] bg-[#00B9F1]/10 text-[#002E6E]' : 'border-[#E5E2DA] text-[#6A6F73] hover:bg-gray-50'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Paytm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === 'netbanking' ? 'border-[#A435F0] bg-[#A435F0]/10 text-[#A435F0]' : 'border-[#E5E2DA] text-[#6A6F73] hover:bg-gray-50'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Netbanking</span>
                </button>

              </div>
            </div>

            {/* Coupon Code Bar */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-[#F7F9FA] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-bold uppercase focus:outline-none focus:border-[#A435F0] text-[#2D2F31]"
                />
                {couponApplied && (
                  <span className="absolute right-3 top-2 text-[10px] font-black text-[#0D9488] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> APPLIED
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2D2F31] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
              >
                Apply
              </button>
            </form>

            {/* Order Summary & Checkout CTA */}
            <div className="pt-3 border-t border-[#E5E2DA] space-y-3">
              <div className="space-y-1 text-xs text-[#6A6F73]">
                <div className="flex justify-between">
                  <span>Original Price:</span>
                  <span>₹{item.originalPrice}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-[#8710D8] font-bold">
                    <span>Coupon Discount (OFFLINE85):</span>
                    <span>- ₹{savings}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-[#2D2F31] pt-1 border-t border-[#E5E2DA]">
                  <span>Total Payable:</span>
                  <span>₹{currentPrice}</span>
                </div>
              </div>

              <button
                onClick={handleCompletePayment}
                disabled={loading}
                className="w-full py-3.5 bg-[#A435F0] hover:bg-[#8710D8] text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Complete Purchase (₹{currentPrice})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6A6F73] text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>30-Day Money-Back Guarantee • Secure 256-Bit SSL Encryption</span>
              </div>
            </div>

          </div>
        ) : (
          /* Udemy Style Purchase Success Screen */
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-[#A435F0] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-black text-[#A435F0] uppercase tracking-widest block mb-1">
                ENROLLMENT CONFIRMED
              </span>
              <h3 className="text-2xl font-black text-[#2D2F31]">Congratulations on Enrolling!</h3>
              <p className="text-xs text-[#6A6F73] mt-1">
                You now have full lifetime access to <strong>{purchaseCompleted.itemTitle}</strong>.
              </p>
            </div>

            {/* Udemy Official Receipt Box */}
            <div className="bg-[#F7F9FA] border border-[#E5E2DA] p-5 rounded-2xl text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#E5E2DA] pb-2">
                <span className="text-[#6A6F73]">Order Reference:</span>
                <span className="font-mono font-bold text-[#2D2F31]">{purchaseCompleted.orderId}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E2DA] pb-2">
                <span className="text-[#6A6F73]">Transaction ID:</span>
                <span className="font-mono text-[#A435F0] font-bold">{purchaseCompleted.txnId}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E2DA] pb-2">
                <span className="text-[#6A6F73]">Amount Paid:</span>
                <span className="font-bold text-[#2D2F31]">{purchaseCompleted.amountPaid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6A6F73]">Payment Method:</span>
                <span className="font-bold text-[#0D9488]">{purchaseCompleted.paymentMethod}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E2DA] bg-white text-[#2D2F31] font-bold text-xs hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[#A435F0]" />
                <span>Download Invoice PDF</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#A435F0] hover:bg-[#8710D8] text-white font-bold text-xs"
              >
                Access Unlocked Tools Now
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
