import express from 'express';

const router = express.Router();

// In-memory transaction store for Paytm test gateway
const paytmTransactions = [
  {
    orderId: 'ORD_ORBIT_DEMO_01',
    txnId: 'PTM2026092088491021',
    amount: 8999,
    planName: 'Orbit Campus & School Institutional License',
    billingCycle: 'Yearly',
    customerEmail: 'admin@offline-orbit.edu',
    paymentMode: 'Paytm UPI',
    bankTxnId: '427189043211',
    status: 'TXN_SUCCESS',
    respCode: '01',
    respMsg: 'Txn Successful',
    timestamp: new Date(Date.now() - 7 * 86400000).toISOString()
  }
];

// POST /api/paytm/initiate
// Initiates Paytm Test Payment Gateway Handshake
router.post('/initiate', async (req, res) => {
  try {
    const { orderId, amount, planName, billingCycle, customerEmail, customerName } = req.body;
    
    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    const generatedOrderId = orderId || `ORD_ORBIT_${Date.now()}`;
    const txnToken = `PTM_TEST_TOKEN_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;

    res.json({
      success: true,
      mid: 'OFFLINEORBIT_TEST_MID',
      orderId: generatedOrderId,
      txnToken,
      amount: Number(amount),
      planName: planName || 'Offline Orbit Subscription',
      billingCycle: billingCycle || 'Monthly',
      customerEmail: customerEmail || 'admin@offline-orbit.edu',
      status: 'INITIATED',
      callbackUrl: '/api/paytm/verify'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/paytm/verify
// Simulates / verifies Paytm Test Payment Transaction
router.post('/verify', async (req, res) => {
  try {
    const { orderId, amount, planName, billingCycle, customerEmail, paymentMode } = req.body;

    const txnId = `PTM${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;
    const bankTxnId = `BANK_UTR_${Math.floor(100000000000 + Math.random() * 900000000000)}`;

    const transactionRecord = {
      orderId: orderId || `ORD_ORBIT_${Date.now()}`,
      txnId,
      amount: Number(amount) || 999,
      planName: planName || 'Orbit Campus Institutional License',
      billingCycle: billingCycle || 'Monthly',
      customerEmail: customerEmail || 'admin@offline-orbit.edu',
      paymentMode: paymentMode || 'Paytm UPI',
      bankTxnId,
      status: 'TXN_SUCCESS',
      respCode: '01',
      respMsg: 'Txn Successful',
      timestamp: new Date().toISOString()
    };

    paytmTransactions.unshift(transactionRecord);

    res.json({
      success: true,
      transaction: transactionRecord,
      message: 'Payment verified successfully via Paytm PG Test Gateway.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/paytm/history
// Returns all Paytm subscription billing transactions
router.get('/history', async (req, res) => {
  try {
    res.json({
      success: true,
      transactions: paytmTransactions
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
