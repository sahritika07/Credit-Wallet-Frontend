import React, { useEffect, useState } from 'react';
import { getCampaigns, createCampaign, fundCampaign, getWallets } from '../services/api';
import Modal from '../components/Modal';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [campaignCurrencyId, setCampaignCurrencyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await getCampaigns();
        const data = Array.isArray(res) ? res : (res && res.data) ? res.data : [];
        setCampaigns(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // load wallets to determine available currencies (pick campaign currency)
  useEffect(() => {
    async function loadWallets() {
      try {
        const w = await getWallets();
        const allWallets = Array.isArray(w) ? w : (w && w.data) ? w.data : [];
        setWallets(allWallets);
        const campaignWallet = allWallets.find((x) => x.currency && x.currency.module === 'campaign');
        if (campaignWallet) setCampaignCurrencyId(campaignWallet.currency.id || campaignWallet.currency_id);
      } catch (err) {
        // ignore
      }
    }
    loadWallets();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !goal) {
      setErrorMessage('Please enter a valid title and goal amount.');
      setShowModal(true);
      return;
    }
    if (!campaignCurrencyId) {
      setErrorMessage('No campaign currency available in your wallets. Please top up Campaign Credits first.');
      setShowModal(true);
      return;
    }

    try {
      const payload = { title, targetAmount: Number(goal), currencyId: campaignCurrencyId };
      const res = await createCampaign(payload);
      const created = res || res.campaign || res.data || res;
      setCampaigns((p) => [created, ...p]);
      setTitle('');
      setGoal(0);
    } catch (err) {
      setErrorMessage(err.message || 'Create failed');
      setShowModal(true);
    }
  };

  const handleFund = async (id) => {
    const amount = parseInt(prompt('Amount to fund (in credits)'), 10);
    if (!amount) {
      return;
    }
    if (!campaignCurrencyId) {
      setErrorMessage('No campaign currency available.');
      setShowModal(true);
      return;
    }
    try {
      await fundCampaign(id, { currencyId: campaignCurrencyId, amount });
      setErrorMessage('Fund request sent; credits will be applied after successful webhook.');
      setShowModal(true);
    } catch (err) {
      setErrorMessage(err.message || 'Fund failed');
      setShowModal(true);
    }
  };

  if (loading) return <div className="p-6 text-center text-slate-500">Loading campaigns...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6 rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
        <h2 className="text-3xl font-semibold">Campaign management</h2>
        <p className="mt-2 text-slate-200">Create campaigns and fund them using Campaign Credits only.</p>
      </div>

      <form onSubmit={handleCreate} className="mb-6 grid gap-3 rounded-3xl bg-white p-6 shadow-sm sm:grid-cols-[1fr_140px]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Campaign title"
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
        />
        <div className="flex gap-3">
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Goal credits"
            type="number"
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
          />
          <button className="rounded-2xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700">Create</button>
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2">
        {campaigns.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">No campaigns yet</div>
        ) : (
          campaigns.map((c) => (
            <div key={c.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{c.description || 'No description provided.'}</p>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">{c.currency?.code || 'CAMPAIGN'}</span>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-600">
                <div>
                  <p>Goal: {c.target_amount ?? c.targetAmount ?? '-'}</p>
                  <p className="mt-1">Raised: {c.current_amount ?? c.currentAmount ?? 0}</p>
                </div>
                <button className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700" onClick={() => handleFund(c.id)}>
                  Fund
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <Modal title="Campaign error" message={errorMessage} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
