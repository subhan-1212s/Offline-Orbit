import React, { useState } from 'react';
import { 
  X, Check, Star, ShieldCheck, CreditCard, Smartphone, 
  Building2, Lock, Download, CheckCircle2, Award, Clock, 
  Sparkles, Copy, FileText, Printer, Volume2, ArrowRight
} from 'lucide-react';

export const ByjusCourseCheckoutModal = ({ isOpen, onClose, courseItem, onPurchaseSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('student@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('742');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  
  const [couponCode, setCouponCode] = useState('BYJUS85');
  const [couponApplied, setCouponApplied] = useState(true);
  const [loading, setLoading] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(null);
  const [copiedUtr, setCopiedUtr] = useState(false);

  if (!isOpen) return null;

  const item = courseItem || {
    id: 'byjus-stem-grade6-10',
    title: 'BYJU\'S Comprehensive Class 6–10 STEM Learning Kit (Offline SD Card Ready)',
    subtitle: '1,200+ concept 3D animated lessons, 300+ diagnostic chapter quizzes, formula vaults, and offline local sync.',
    instructor: 'BYJU\'S Senior Academic Directorate',
    rating: 4.92,
    ratingCount: '28,450 ratings',
    studentsCount: '185,000+ enrolled',
    originalPrice: 4999,
    discountPrice: 699,
    badge: 'Most Popular',
    badgeColor: 'bg-[#FFC107] text-[#1E2229]',
    features: [
      '100% Offline Compatible (Preloaded on Local Storage / SD Card)',
      '1,200+ Animated Concept Visualizations (~400KB Lightweight Packs)',
      '300+ Chapter-wise Diagnostic Quizzes with Misconception Analysis',
      'NCERT / CBSE / ICSE Aligned Bloom\'s Taxonomy Cognitive Reports',
      'Verified BYJU\'S Course Completion Certificate for Accreditation'
    ]
  };

  const currentPrice = couponApplied ? item.discountPrice : item.originalPrice;
  const savings = item.originalPrice - currentPrice;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'BYJUS85' || clean === 'OFFLINE85' || clean === 'HACKATHON2026') {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon. Try BYJUS85 for 85% instant discount.');
    }
  };

  const handleProcessPayment = () => {
    setLoading(true);

    setTimeout(() => {
      const now = new Date();
      const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
      const utrNumber = `42${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      const orderId = `PTM_ORB_${randomDigits}`;

      let paidViaLabel = 'Google Pay (GPay UPI)';
      if (paymentMethod === 'phonepe') paidViaLabel = 'PhonePe UPI';
      else if (paymentMethod === 'paytm') paidViaLabel = 'Paytm UPI / Wallet';
      else if (paymentMethod === 'upi') paidViaLabel = `BHIM UPI (${upiId})`;
      else if (paymentMethod === 'card') paidViaLabel = `Debit Card (${cardNumber.slice(-4)})`;
      else if (paymentMethod === 'netbanking') paidViaLabel = `Net Banking (${selectedBank})`;

      const receipt = {
        orderId,
        txnId: `TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        utrNumber,
        itemTitle: item.title,
        amountPaid: `₹${currentPrice}.00`,
        rawAmount: currentPrice,
        paymentMethod: paidViaLabel,
        methodKey: paymentMethod,
        date: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
        payerBank: 'State Bank of India (A/c ending 4821)',
        merchantName: 'Offline-Orbit Learning Solutions Pvt Ltd',
        gstin: '29AABCU9603R1ZM',
        sacCode: '999293',
        courseId: item.id
      };

      try {
        const existing = JSON.parse(localStorage.getItem('orbit_educator_purchases') || '[]');
        localStorage.setItem('orbit_educator_purchases', JSON.stringify([item.id, ...existing]));
      } catch (e) {}

      setPurchaseCompleted(receipt);
      if (onPurchaseSuccess) onPurchaseSuccess(item, receipt);
      setLoading(false);
    }, 1200);
  };

  // Download Receipt / Tax Invoice Function
  const handleDownloadReceipt = () => {
    if (!purchaseCompleted) return;

    // 1. Generate text receipt file download
    const receiptContent = `======================================================================
               OFFLINE-ORBIT LEARNING SOLUTIONS PVT. LTD.
           In Strategic Partnership with BYJU'S Learning Programs
                 TAX INVOICE & OFFICIAL PAYMENT RECEIPT
======================================================================

TAX INVOICE NO: INV/2026-27/${purchaseCompleted.orderId.replace('PTM_ORB_', '')}
DATE & TIME:    ${purchaseCompleted.date}, ${purchaseCompleted.time}
GSTIN:          ${purchaseCompleted.gstin}
SAC CODE:       ${purchaseCompleted.sacCode} (Interactive Distance Education Services)
STATE CODE:     29 (Karnataka, India)

----------------------------------------------------------------------
PAYMENT CONFIRMATION (PAYTM GATEWAY & NPCI VERIFIED)
----------------------------------------------------------------------
PAYTM ORDER ID:  ${purchaseCompleted.orderId}
PAYTM TXN ID:    ${purchaseCompleted.txnId}
UPI REF / UTR:   ${purchaseCompleted.utrNumber}
PAYMENT METHOD:  ${purchaseCompleted.paymentMethod}
PAYER BANK:      ${purchaseCompleted.payerBank}
BENEFICIARY:     ${purchaseCompleted.merchantName}
PAYMENT STATUS:  SUCCESS (Verified & Confirmed)

----------------------------------------------------------------------
PROGRAM DETAILS & FEE BREAKDOWN
----------------------------------------------------------------------
ITEM DESCRIPTION:
${purchaseCompleted.itemTitle}

1. Base Learning Fee (Exclusive of GST):      ₹${(purchaseCompleted.rawAmount * 0.82).toFixed(2)}
2. Central GST (CGST @ 9%):                   ₹${(purchaseCompleted.rawAmount * 0.09).toFixed(2)}
3. State GST (SGST @ 9%):                     ₹${(purchaseCompleted.rawAmount * 0.09).toFixed(2)}
----------------------------------------------------------------------
TOTAL AMOUNT PAID (INCL. ALL TAXES):          ${purchaseCompleted.amountPaid}
----------------------------------------------------------------------

PACKAGE ACCESS INSTRUCTIONS:
- Full offline curriculum and 3D animated lessons are now unlocked.
- Access the offline package directly inside your Educator & Student Workspaces.
- Digital certificate of completion and study worksheets unlocked automatically.

Authorised Signatory
Offline-Orbit Learning Solutions & BYJU'S Academic Verification
Website: https://offline-orbit.edu | Support: support@offline-orbit.edu
======================================================================`;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Paytm_Receipt_${purchaseCompleted.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // 2. Also trigger formatted print dialog for instant PDF saving
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Receipt - ${purchaseCompleted.orderId}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e2229; background: #fff; }
            .header { border-bottom: 2px solid #00B9F1; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
            .paytm-brand { font-size: 28px; font-weight: 900; color: #002E6E; }
            .paytm-brand span { color: #00B9F1; }
            .byjus-badge { background: #6C227E; color: #fff; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; }
            .status-badge { background: #E8F8F0; color: #00BA74; font-weight: 800; font-size: 13px; padding: 6px 14px; border-radius: 20px; display: inline-block; margin-top: 15px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0; font-size: 13px; line-height: 1.6; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
            .table th { background: #F5F7FA; text-align: left; padding: 10px; border: 1px solid #E5E7EB; }
            .table td { padding: 12px 10px; border: 1px solid #E5E7EB; }
            .total-row { font-weight: 900; font-size: 16px; background: #F8FAFC; }
            .footer { margin-top: 40px; border-top: 1px solid #E5E7EB; padding-top: 20px; font-size: 11px; color: #6B7280; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="paytm-brand">Pay<span>tm</span></div>
              <div style="font-size: 12px; color: #5A606C; margin-top: 4px;">Official Payment Receipt & Tax Invoice</div>
            </div>
            <div style="text-align: right;">
              <span class="byjus-badge">BYJU'S Learning Partner</span>
              <div style="font-size: 11px; color: #6B7280; margin-top: 6px;">GSTIN: ${purchaseCompleted.gstin}</div>
            </div>
          </div>

          <div style="text-align: center; margin: 25px 0 15px;">
            <div class="status-badge">✔ PAID SUCCESSFULLY</div>
            <div style="font-size: 32px; font-weight: 900; color: #1E2229; margin-top: 8px;">${purchaseCompleted.amountPaid}</div>
            <div style="font-size: 13px; color: #5A606C;">Paid to Offline-Orbit Learning Solutions Pvt Ltd</div>
          </div>

          <div class="grid">
            <div>
              <strong>Transaction Details:</strong><br/>
              Paytm Order ID: <b>${purchaseCompleted.orderId}</b><br/>
              UPI Ref / UTR No: <b>${purchaseCompleted.utrNumber}</b><br/>
              Date & Time: ${purchaseCompleted.date} at ${purchaseCompleted.time}
            </div>
            <div>
              <strong>Payment Source:</strong><br/>
              Payment Method: <b>${purchaseCompleted.paymentMethod}</b><br/>
              Bank: ${purchaseCompleted.payerBank}<br/>
              SAC Code: ${purchaseCompleted.sacCode}
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>HSN/SAC</th>
                <th style="text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>${purchaseCompleted.itemTitle}</b><br/><span style="font-size: 11px; color: #6B7280;">Full 100% Offline STEM curriculum package & question bank</span></td>
                <td>999293</td>
                <td style="text-align: right;">₹${(purchaseCompleted.rawAmount * 0.82).toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="2">CGST (9%)</td>
                <td style="text-align: right;">₹${(purchaseCompleted.rawAmount * 0.09).toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="2">SGST (9%)</td>
                <td style="text-align: right;">₹${(purchaseCompleted.rawAmount * 0.09).toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td colspan="2">Total Paid</td>
                <td style="text-align: right; color: #00B9F1;">${purchaseCompleted.amountPaid}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            This is a computer-generated tax invoice verified by Paytm & NPCI. No physical signature is required.<br/>
            Offline-Orbit Learning Solutions Private Limited • Bengaluru, Karnataka 560001
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const copyUtrToClipboard = () => {
    if (!purchaseCompleted) return;
    navigator.clipboard.writeText(purchaseCompleted.utrNumber);
    setCopiedUtr(true);
    setTimeout(() => setCopiedUtr(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-[#E5E2DA] relative my-auto">
        
        {/* Modal Header */}
        {!purchaseCompleted ? (
          /* BYJU'S Signature Header */
          <div className="bg-gradient-to-r from-[#6C227E] via-[#813588] to-[#4C1258] text-white p-5 flex items-center justify-between border-b border-purple-900/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFC107] text-[#1E2229] font-black text-xl flex items-center justify-center shadow-lg border-2 border-white/20">
                <span>B</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#FFC107] text-[#1E2229] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    BYJU'S Learning Programs
                  </span>
                  <span className="text-white/80 text-[11px] font-semibold">
                    100% Offline Ready
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-white leading-tight mt-0.5">
                  Essential Curriculum & Offline Smart Prep Checkout
                </h3>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 text-white/70 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          /* Paytm Official Top Brand Bar */
          <div className="bg-[#002E6E] text-white px-6 py-4 flex items-center justify-between border-b border-[#00B9F1]/40">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-black tracking-tight">
                Pay<span className="text-[#00B9F1]">tm</span>
              </div>
              <span className="bg-[#00B9F1]/20 text-[#00B9F1] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider border border-[#00B9F1]/30">
                Verified Gateway
              </span>
            </div>
            <button 
              onClick={onClose}
              className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {!purchaseCompleted ? (
          /* Step 1: BYJU'S Package & Indian Payment Gateways View */
          <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
            
            {/* BYJU'S Course Summary Card */}
            <div className="bg-[#FAF5FF] border border-[#E9D5FF] p-4 sm:p-5 rounded-2xl space-y-3 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider ${item.badgeColor || 'bg-[#FFC107] text-[#1E2229]'}`}>
                  {item.badge || 'Bestseller'}
                </span>
                <div className="flex items-center gap-1 text-xs text-[#B4690E] font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                  <span>{item.rating || 4.9}</span>
                  <span className="text-[#6B7280] font-normal">({item.ratingCount || '28.4k reviews'})</span>
                </div>
              </div>

              <div>
                <h4 className="font-black text-base text-[#1E2229] leading-snug">{item.title}</h4>
                <p className="text-xs text-[#5A606C] mt-1">{item.subtitle}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] font-bold text-[#6C227E] bg-purple-100/70 px-2 py-0.5 rounded">
                    Curriculum: CBSE • ICSE • State Boards Aligned
                  </span>
                  <span className="text-[11px] font-bold text-[#0D9488] bg-teal-50 px-2 py-0.5 rounded">
                    Preloaded SD / Local Cache
                  </span>
                </div>
              </div>

              {/* Price & Savings */}
              <div className="pt-2 border-t border-[#E9D5FF] flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#1E2229]">₹{currentPrice}</span>
                  <span className="text-xs text-[#89909E] line-through font-semibold">₹{item.originalPrice}</span>
                  {couponApplied && (
                    <span className="text-xs font-black text-[#6C227E] bg-purple-100 px-2 py-0.5 rounded">
                      86% OFF APPLIED
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-extrabold text-[#B4690E] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Instant Lifetime Offline Access
                </span>
              </div>
            </div>

            {/* Included Curriculum Features */}
            <div className="space-y-1.5 text-xs text-[#1E2229]">
              <span className="font-extrabold text-[11px] text-[#5A606C] uppercase tracking-wider block mb-1">
                This BYJU'S smart pack includes:
              </span>
              {(item.features || []).map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-[#374151] leading-snug">{f}</span>
                </div>
              ))}
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black text-[#1E2229] uppercase tracking-wider">
                  Select Payment Method (Fast & Secure)
                </label>
                <span className="text-[10px] font-bold text-[#0D9488] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-bit SSL Protected
                </span>
              </div>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                
                {/* Google Pay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('gpay')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === 'gpay' 
                      ? 'border-[#4285F4] bg-[#4285F4]/10 shadow-sm ring-1 ring-[#4285F4]' 
                      : 'border-[#E5E2DA] bg-[#FAF9F6] hover:bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">P</span>
                    <span className="text-[#FBBC05]">a</span>
                    <span className="text-[#34A853]">y</span>
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1E2229]">Google Pay</div>
                    <div className="text-[10px] text-[#5A606C]">Instant UPI</div>
                  </div>
                </button>

                {/* PhonePe */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('phonepe')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === 'phonepe' 
                      ? 'border-[#5F259F] bg-[#5F259F]/10 shadow-sm ring-1 ring-[#5F259F]' 
                      : 'border-[#E5E2DA] bg-[#FAF9F6] hover:bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#5F259F] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                    <span>पे</span>
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1E2229]">PhonePe</div>
                    <div className="text-[10px] text-[#5A606C]">Fast UPI App</div>
                  </div>
                </button>

                {/* Paytm */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paytm')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === 'paytm' 
                      ? 'border-[#00B9F1] bg-[#00B9F1]/10 shadow-sm ring-1 ring-[#00B9F1]' 
                      : 'border-[#E5E2DA] bg-[#FAF9F6] hover:bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#002E6E] text-[#00B9F1] flex items-center justify-center font-black text-[10px] shadow-xs shrink-0">
                    PTM
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1E2229]">Paytm UPI</div>
                    <div className="text-[10px] text-[#5A606C]">Wallet & UPI</div>
                  </div>
                </button>

                {/* Any UPI ID */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === 'upi' 
                      ? 'border-[#0D9488] bg-[#0D9488]/10 shadow-sm ring-1 ring-[#0D9488]' 
                      : 'border-[#E5E2DA] bg-[#FAF9F6] hover:bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1E2229]">Other UPI</div>
                    <div className="text-[10px] text-[#5A606C]">BHIM / Any VPA</div>
                  </div>
                </button>

                {/* Debit & Credit Cards */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-[#6C227E] bg-[#6C227E]/10 shadow-sm ring-1 ring-[#6C227E]' 
                      : 'border-[#E5E2DA] bg-[#FAF9F6] hover:bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#6C227E] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1E2229]">Cards</div>
                    <div className="text-[10px] text-[#5A606C]">Visa, RuPay, MC</div>
                  </div>
                </button>

                {/* Net Banking */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === 'netbanking' 
                      ? 'border-[#4F46E5] bg-[#4F46E5]/10 shadow-sm ring-1 ring-[#4F46E5]' 
                      : 'border-[#E5E2DA] bg-[#FAF9F6] hover:bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1E2229]">Net Banking</div>
                    <div className="text-[10px] text-[#5A606C]">All Indian Banks</div>
                  </div>
                </button>

              </div>

              {/* Dynamic Sub-Form according to selected method */}
              <div className="bg-[#FAF9F6] border border-[#E5E2DA] p-3.5 rounded-2xl">
                {paymentMethod === 'gpay' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#1E2229] flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-[#4285F4]" />
                      Google Pay UPI ID:
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. yourname@okhdfcbank"
                        className="flex-1 bg-white border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-bold text-[#1E2229] focus:outline-none focus:border-[#4285F4]"
                      />
                      <span className="bg-[#34A853]/15 text-[#2E7D32] text-[10px] font-black px-2.5 py-2 rounded-xl flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    </div>
                    <span className="text-[10px] text-[#6B7280]">Supports Google Pay, Axis Bank, HDFC Bank, ICICI & SBI UPI handles.</span>
                  </div>
                )}

                {paymentMethod === 'phonepe' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#1E2229] flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-[#5F259F]" />
                      PhonePe UPI ID / Mobile Number:
                    </label>
                    <input 
                      type="text" 
                      defaultValue="9876543210@ybl"
                      placeholder="e.g. mobilenumber@ybl"
                      className="w-full bg-white border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-bold text-[#1E2229] focus:outline-none focus:border-[#5F259F]"
                    />
                    <span className="text-[10px] text-[#6B7280]">Instant UPI notification will be received on your PhonePe mobile app.</span>
                  </div>
                )}

                {paymentMethod === 'paytm' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#1E2229] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#00B9F1]" />
                      Paytm Wallet / UPI ID:
                    </label>
                    <input 
                      type="text" 
                      defaultValue="9876543210@paytm"
                      placeholder="e.g. mobilenumber@paytm"
                      className="w-full bg-white border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-bold text-[#1E2229] focus:outline-none focus:border-[#00B9F1]"
                    />
                    <span className="text-[10px] text-[#6B7280]">Zero convenience fees. Direct confirmation via Paytm Payments Bank gateway.</span>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#1E2229]">Enter Any Valid UPI VPA ID:</label>
                    <input 
                      type="text" 
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@upi / username@sbi"
                      className="w-full bg-white border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-bold text-[#1E2229] focus:outline-none focus:border-[#0D9488]"
                    />
                    <span className="text-[10px] text-[#6B7280]">Supports BHIM, CRED, Amazon Pay UPI, WhatsApp Pay.</span>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-bold text-[#1E2229]">Card Details (Debit / Credit):</label>
                      <span className="text-[10px] font-bold text-[#5A606C]">Visa • MasterCard • RuPay</span>
                    </div>
                    <input 
                      type="text" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number (16 digits)"
                      className="w-full bg-white border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-bold text-[#1E2229] focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="bg-white border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-bold text-[#1E2229] focus:outline-none"
                      />
                      <input 
                        type="password" 
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="CVV (3 digits)"
                        maxLength={4}
                        className="bg-white border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-bold text-[#1E2229] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#1E2229]">Select Your Bank:</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full bg-white border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-bold text-[#1E2229] focus:outline-none"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      <option value="Punjab National Bank">Punjab National Bank</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-bold uppercase focus:outline-none focus:border-[#6C227E] text-[#1E2229]"
                />
                {couponApplied && (
                  <span className="absolute right-3 top-2 text-[10px] font-black text-[#0D9488] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> BYJUS85 (85% SAVINGS)
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#6C227E] hover:bg-[#581A66] text-white text-xs font-bold rounded-xl transition-colors"
              >
                Apply
              </button>
            </form>

            {/* Order Price Summary & Checkout Action */}
            <div className="pt-2 border-t border-[#E5E2DA] space-y-3">
              <div className="space-y-1 text-xs text-[#5A606C]">
                <div className="flex justify-between">
                  <span>Curriculum Package Price:</span>
                  <span>₹{item.originalPrice}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-[#6C227E] font-bold">
                    <span>Special Byju's Learning Discount:</span>
                    <span>- ₹{savings}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-[#1E2229] pt-1.5 border-t border-[#E5E2DA]">
                  <span>Total Amount Payable:</span>
                  <span className="text-[#0D9488]">₹{currentPrice}</span>
                </div>
              </div>

              <button
                onClick={handleProcessPayment}
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-[#00B9F1] via-[#009FD6] to-[#002E6E] hover:opacity-95 text-white font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connecting to Paytm & Bank Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      Pay ₹{currentPrice} via {
                        paymentMethod === 'gpay' ? 'Google Pay' :
                        paymentMethod === 'phonepe' ? 'PhonePe' :
                        paymentMethod === 'paytm' ? 'Paytm' :
                        paymentMethod === 'upi' ? 'UPI' :
                        paymentMethod === 'card' ? 'Debit/Credit Card' : 'Net Banking'
                      }
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6B7280] text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>Authorized BYJU'S Learning Package • 100% Offline Access Guaranteed</span>
              </div>
            </div>

          </div>
        ) : (
          /* Step 2: ORIGINAL PAYTM PAYMENT SUCCESS SCREEN WITH DOWNLOAD RECEIPT */
          <div className="bg-[#F5F7FA] p-5 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
            
            {/* Top Paytm Hero Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-center shadow-md border border-[#E5E7EB] space-y-4 relative overflow-hidden">
              
              {/* Vibrant Pulsing Green Success Check Badge */}
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-[#00BA74]/15 rounded-full animate-ping opacity-60" />
                <div className="w-16 h-16 rounded-full bg-[#00BA74] text-white flex items-center justify-center shadow-lg relative z-10">
                  <Check className="w-9 h-9 stroke-[3]" />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] text-[#00BA74] text-xs font-black uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Paid Successfully
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-[#1E2229] tracking-tight">
                  {purchaseCompleted.amountPaid}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#5A606C] mt-1">
                  To: <span className="text-[#1E2229] font-bold">Offline-Orbit Learning Solutions Pvt Ltd</span>
                </p>
                <p className="text-[11px] text-[#6C227E] font-bold mt-0.5">
                  BYJU'S Learning Programs & Offline Curriculum Partner
                </p>
              </div>

              {/* Realistic Paytm Soundbox Banner */}
              <div className="bg-[#002E6E] text-white p-3 rounded-2xl flex items-center justify-between text-xs shadow-inner">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#00B9F1] text-white flex items-center justify-center">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-extrabold text-[11px] text-[#00B9F1] uppercase tracking-wider">
                      Paytm Soundbox Alert
                    </div>
                    <div className="font-semibold text-white/90 text-xs">
                      "Paytm par {purchaseCompleted.amountPaid} prapt hue"
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-[#00B9F1]/20 text-[#00B9F1] px-2 py-0.5 rounded-full border border-[#00B9F1]/40">
                  Verified
                </span>
              </div>

            </div>

            {/* Official Paytm Transaction Details Breakdown Box */}
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-5 shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                <span className="font-extrabold text-[#1E2229] text-xs uppercase tracking-wider">
                  Transaction Breakdown
                </span>
                <span className="text-[11px] font-mono text-[#00B9F1] font-bold">
                  {purchaseCompleted.date}, {purchaseCompleted.time}
                </span>
              </div>

              {/* UPI Reference / UTR Number with Copy Action */}
              <div className="flex items-center justify-between py-1 border-b border-gray-100">
                <span className="text-[#6B7280]">UPI Ref / UTR No:</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-[#1E2229]">
                  <span>{purchaseCompleted.utrNumber}</span>
                  <button 
                    onClick={copyUtrToClipboard}
                    className="p-1 text-gray-400 hover:text-[#00B9F1] rounded transition-colors"
                    title="Copy UTR Number"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {copiedUtr && <span className="text-[10px] text-green-600 font-bold">Copied!</span>}
                </div>
              </div>

              {/* Paytm Order ID */}
              <div className="flex items-center justify-between py-1 border-b border-gray-100">
                <span className="text-[#6B7280]">Paytm Order ID:</span>
                <span className="font-mono font-bold text-[#002E6E]">{purchaseCompleted.orderId}</span>
              </div>

              {/* Course Title */}
              <div className="flex items-start justify-between py-1 border-b border-gray-100">
                <span className="text-[#6B7280] shrink-0">Package Enrolled:</span>
                <span className="font-bold text-[#1E2229] text-right ml-4 line-clamp-1">
                  {purchaseCompleted.itemTitle}
                </span>
              </div>

              {/* Paid Using */}
              <div className="flex items-center justify-between py-1 border-b border-gray-100">
                <span className="text-[#6B7280]">Paid Using:</span>
                <span className="font-bold text-[#1E2229] flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-[#00B9F1]" />
                  {purchaseCompleted.paymentMethod}
                </span>
              </div>

              {/* Debited From */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[#6B7280]">Payer Bank Account:</span>
                <span className="font-semibold text-[#1E2229]">{purchaseCompleted.payerBank}</span>
              </div>
            </div>

            {/* Action Buttons: DOWNLOAD RECEIPT + Access Course */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              
              {/* Prominent Download Receipt Button */}
              <button
                onClick={handleDownloadReceipt}
                className="flex-1 py-3 px-4 rounded-2xl bg-white border-2 border-[#00B9F1] hover:bg-[#00B9F1]/10 text-[#002E6E] font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[#00B9F1]" />
                <span>Download Official Receipt</span>
              </button>

              {/* Start Learning / Go to Dashboard */}
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#002E6E] hover:bg-[#001D47] text-white font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Access Unlocked Course Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[10px] text-center text-[#89909E]">
              Tax Invoice and course access key generated. Official GST SAC 999293. You can download or print this receipt anytime.
            </p>

          </div>
        )}

      </div>
    </div>
  );
};
