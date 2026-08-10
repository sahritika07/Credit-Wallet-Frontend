import { useEffect, useState } from 'react';
import { createCampaign, fundCampaign, getCampaigns, getWallets } from '../services/api';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [selectedCurrencyId, setSelectedCurrencyId] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [campaignData, walletData] = await Promise.all([getCampaigns(), getWallets()]);
        const availableWallets = Array.isArray(walletData) ? walletData : [];
        const campaignWallets = availableWallets.filter((wallet) => wallet.currency?.module === 'campaign');

        setCampaigns(Array.isArray(campaignData) ? campaignData : []);
        setWallets(campaignWallets);

        if (campaignWallets[0]?.currency?.id) {
          setSelectedCurrencyId(String(campaignWallets[0].currency.id));
        }
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

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const res = await createCampaign({
        title,
        description: '',
        targetAmount: Number(goal),
        currencyId: Number(selectedCurrencyId),
      });
      setCampaigns((previous) => [res, ...previous]);
      setTitle('');
      setGoal('');
    } catch (err) {
      setErrorMessage(err.message || 'Create failed');
      setShowModal(true);
    }
  };

  const handleFund = async (campaign) => {
    const amount = parseInt(prompt('Amount to fund (in credits)'), 10);
    if (!amount) return;

    const currencyId = campaign.currency_id || campaign.currency?.id || Number(selectedCurrencyId);

    try {
      const updatedCampaign = await fundCampaign(campaign.id, { currencyId, amount });
      setCampaigns((previous) =>
        previous.map((item) => (item.id === updatedCampaign.id ? updatedCampaign : item)),
      );
      alert('Campaign funded successfully.');
    } catch (err) {
      setErrorMessage(err.message || 'Fund failed');
      setShowModal(true);
    }
  };

  if (loading) return <div className="page-state">Loading campaigns...</div>;

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Campaign workspace</p>
          <h1 className="section-title">Create and fund campaigns with campaign credits</h1>
        </div>
        <p className="section-copy">Funding consumes credits from your campaign wallet and records the spend in the ledger immediately.</p>
      </section>

      <section className="panel-card">
        <div className="panel-header">
          <div>
            <p className="eyebrow">New campaign</p>
            <h2 className="section-title">Start a campaign</h2>
          </div>
        </div>

        <form onSubmit={handleCreate} className="form-grid">
          <label className="field-group">
            <span>Campaign title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Launch a new funding goal" className="field-input" />
          </label>

          <label className="field-group">
            <span>Target credits</span>
            <input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="25" type="number" className="field-input" />
          </label>

          <label className="field-group">
            <span>Funding currency</span>
            <select value={selectedCurrencyId} onChange={(e) => setSelectedCurrencyId(e.target.value)} className="field-input">
              {wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.currency?.id}>
                  {wallet.currency?.name} ({wallet.currency?.code})
                </option>
              ))}
            </select>
          </label>

          <div className="form-actions">
            <button className="button-link" disabled={!selectedCurrencyId}>
              Create campaign
            </button>
          </div>
        </form>
      </section>

      <section className="feature-grid">
        {campaigns.length === 0 && <div className="panel-card">No campaigns yet.</div>}
        {campaigns.map((campaign) => (
          <article key={campaign.id} className="panel-card">
            <div className="wallet-topline">
              <p className="eyebrow">{campaign.status}</p>
              <span className="wallet-chip">{campaign.currency?.code || 'CAMPAIGN'}</span>
            </div>
            <h2 className="section-title">{campaign.title}</h2>
            <p className="section-copy">Target: {campaign.target_amount} credits</p>
            <p className="wallet-balance">{campaign.current_amount} / {campaign.target_amount}</p>
            <button className="button-link mt-4" onClick={() => handleFund(campaign)}>
              Fund campaign
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
