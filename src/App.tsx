/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Gamepad2, 
  ShieldCheck, 
  Zap, 
  Download, 
  Award, 
  CheckCircle2, 
  Key, 
  Menu,
  X,
  Target,
  Globe,
  ChevronRight
} from 'lucide-react';

const LOGO_URL = "https://i.ibb.co/Y43SjNzw/App-Icon-5122x.png";

interface RegisteredTeam {
  tournamentTitle: string;
  ign: string;
  uid: string;
  teamName?: string;
  slotNumber: number;
  roomId?: string;
  roomPass?: string;
  registeredAt: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'mymeches'>('home');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedMatchTitle, setSelectedMatchTitle] = useState('Daily Full Map Bermuda Scrims #402');
  
  // Registration Form State
  const [ign, setIgn] = useState('');
  const [uid, setUid] = useState('');
  const [teamName, setTeamName] = useState('');
  const [registeredTeams, setRegisteredTeams] = useState<RegisteredTeam[]>([
    {
      tournamentTitle: 'Daily Full Map Bermuda Scrims #402',
      ign: 'ARãƒ»KILLER',
      uid: '482910482',
      teamName: 'AR LEGENDS',
      slotNumber: 12,
      roomId: '9482104',
      roomPass: 'AR2026',
      registeredAt: '2026-10-07 14:30'
    }
  ]);
  const [successMessage, setSuccessMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ign || !uid) return;

    const newRegistration: RegisteredTeam = {
      tournamentTitle: selectedMatchTitle,
      ign,
      uid,
      teamName,
      slotNumber: Math.floor(Math.random() * 40) + 1,
      roomId: Math.floor(1000000 + Math.random() * 9000000).toString(),
      roomPass: 'AR' + Math.floor(1000 + Math.random() * 9000),
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setRegisteredTeams([newRegistration, ...registeredTeams]);
    setSuccessMessage(`Successfully registered! Slot assigned: #${newRegistration.slotNumber}`);
    setIgn('');
    setUid('');
    setTeamName('');
    setTimeout(() => {
      setIsRegisterModalOpen(false);
      setSuccessMessage('');
      setActiveTab('mymeches');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-white flex flex-col font-['Poppins']">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-[8%] py-4 bg-[rgba(11,16,28,0.85)] backdrop-blur-[10px] fixed w-full top-0 z-[1000] border-b border-[rgba(0,210,255,0.15)]">
        <div className="nav-brand flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <img 
            src={LOGO_URL} 
            alt="AR Esports Logo" 
            className="nav-logo-img w-10 h-10 rounded-full border-2 border-[#00d2ff] shadow-[0_0_10px_rgba(0,210,255,0.5)] object-cover bg-black" 
          />
          <div className="logo text-[22px] font-extrabold text-white tracking-[1px]">
            AR_<span className="text-[#00d2ff]">ESPORTS</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`transition-colors hover:text-[#00d2ff] ${activeTab === 'home' ? 'text-[#00d2ff]' : 'text-gray-300'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('mymeches')} 
            className={`transition-colors hover:text-[#00d2ff] relative ${activeTab === 'mymeches' ? 'text-[#00d2ff]' : 'text-gray-300'}`}
          >
            My Registrations & Rooms
            {registeredTeams.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-[#00d2ff] text-black text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {registeredTeams.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <button 
              onClick={() => setIsRegisterModalOpen(true)}
              className="bg-transparent border border-[#00d2ff] text-[#00d2ff] px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#00d2ff]/10 transition-all"
            >
              <Globe size={14} /> Register
            </button>
          </div>
          <div className="social-nav flex items-center">
            <a href="https://t.me/AR_Esport_support_care" target="_blank" rel="noopener noreferrer" className="text-white text-xl ml-[15px] hover:text-[#00d2ff] transition-colors">
              <i className="fa-brands fa-telegram"></i>
            </a>
            <a href="https://www.instagram.com/ar__esports_?stkn=eWk5amY0bTg1a200" target="_blank" rel="noopener noreferrer" className="text-white text-xl ml-[15px] hover:text-[#00d2ff] transition-colors">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-300 hover:text-white ml-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#070a12]/95 z-40 flex flex-col pt-24 px-8 gap-6 md:hidden animate-in fade-in duration-200">
          <button 
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} 
            className="text-left text-lg font-semibold py-2 border-b border-gray-800 flex items-center justify-between"
          >
            <span>Home</span> <ChevronRight size={18} className="text-[#00d2ff]" />
          </button>
          <button 
            onClick={() => { setActiveTab('mymeches'); setMobileMenuOpen(false); }} 
            className="text-left text-lg font-semibold py-2 border-b border-gray-800 flex items-center justify-between"
          >
            <span>My Registrations ({registeredTeams.length})</span> <ChevronRight size={18} className="text-[#00d2ff]" />
          </button>
          
          <div className="pt-4 flex flex-col gap-3">
            <a 
              href="https://drive.google.com/uc?export=download&id=1y1PkA4qDL1Fi_boGMpMbXPFctOr8Ibbj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#00d2ff] to-[#0072ff] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Download size={18} /> DOWNLOAD APP
            </a>
            <button 
              onClick={() => { setIsRegisterModalOpen(true); setMobileMenuOpen(false); }}
              className="bg-transparent border border-[#00d2ff] text-[#00d2ff] py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Globe size={18} /> GO TO WEB
            </button>
          </div>
        </div>
      )}

      {/* Main Content Router */}
      <main className="flex-1 pt-16">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="hero min-h-[100vh] flex flex-col justify-center items-center text-center px-[20px] py-[60px] pt-[120px] bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.08)_0%,rgba(7,10,18,1)_70%)] relative">
              
              <div className="hero-logo-container mb-[25px]">
                <img 
                  src={LOGO_URL} 
                  alt="AR Esports Main Logo" 
                  className="hero-logo-img w-[200px] h-[200px] rounded-full border-[3px] border-[#00d2ff] shadow-[0_0_35px_rgba(0,210,255,0.6)] object-cover bg-black" 
                />
              </div>

              <div className="badge bg-[#00d2ff]/10 border border-[#00d2ff] text-[#00d2ff] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                ðŸŸ¡ Live Tournaments Running Now In App
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mb-6 leading-tight">
                AR ESPORTS<br />
                <span className="bg-gradient-to-r from-[#00d2ff] to-[#0072ff] bg-clip-text text-transparent">
                  FREE FIRE TOURNAMENTS
                </span>
              </h1>

              <p className="text-gray-400 max-w-[650px] text-base sm:text-lg mb-[35px] leading-[1.6]">
                Join India's premier Free Fire esports platform. Compete in daily Scrims, Clash Squad, & Solo/Squad matches inside our Android App to win real cash rewards instantly.
              </p>
              
              <div className="btn-container flex gap-[15px] flex-wrap justify-center mb-[50px]">
                <a 
                  href="https://drive.google.com/uc?export=download&id=1y1PkA4qDL1Fi_boGMpMbXPFctOr8Ibbj" 
                  className="btn-primary bg-gradient-to-r from-[#00d2ff] to-[#0072ff] text-white px-[32px] py-[14px] rounded-[10px] font-bold inline-flex items-center gap-[10px] shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all hover:-translate-y-[3px]" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-download"></i> DOWNLOAD APP
                </a>
                <a 
                  href="https://t.me/AR_Esport_support_care" 
                  className="btn-secondary bg-transparent text-white border-2 border-[#00d2ff] px-[32px] py-[14px] rounded-[10px] font-bold inline-flex items-center gap-[10px] transition-all hover:bg-[rgba(0,210,255,0.1)] hover:-translate-y-[3px]" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-globe"></i> GO TO WEB
                </a>
              </div>

              {/* Stats Bar */}
              <div className="stats flex gap-[50px] sm:gap-[80px] flex-wrap justify-center border-t border-[rgba(255,255,255,0.1)] pt-[30px] w-full max-w-3xl px-4">
                <div className="stat-box text-center">
                  <h2 className="text-[#00d2ff] text-[28px] font-extrabold">120K+</h2>
                  <p className="text-[12px] text-[#718096] uppercase tracking-[1px] mb-0 mt-1">Active Players</p>
                </div>
                <div className="stat-box text-center">
                  <h2 className="text-[#00d2ff] text-[28px] font-extrabold">10K+</h2>
                  <p className="text-[12px] text-[#718096] uppercase tracking-[1px] mb-0 mt-1">Tournaments</p>
                </div>
                <div className="stat-box text-center">
                  <h2 className="text-[#00d2ff] text-[28px] font-extrabold">45+</h2>
                  <p className="text-[12px] text-[#718096] uppercase tracking-[1px] mb-0 mt-1">Daily Matches</p>
                </div>
              </div>

            </section>

            {/* Features Section */}
            <section className="features py-[80px] px-[8%] bg-[#0b101c]">
              <div className="section-title text-center mb-[50px]">
                <h2 className="text-[32px] font-extrabold">Built For Competitive Free Fire Players</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px]">
                <div className="card bg-[#0f172a] p-[30px] rounded-[15px] border border-[rgba(255,255,255,0.05)] transition-all hover:border-[#00d2ff] hover:-translate-y-[5px]">
                  <div className="text-[30px] text-[#00d2ff] mb-[20px]">
                    <Target size={30} />
                  </div>
                  <h3 className="text-[20px] mb-[10px] font-bold">Daily Scrims</h3>
                  <p className="text-[#a0aec0] text-[14px] leading-[1.6]">Practice daily on Bermuda, Kalahari, and Purgatory with custom room credentials issued 10 minutes prior.</p>
                </div>

                <div className="card bg-[#0f172a] p-[30px] rounded-[15px] border border-[rgba(255,255,255,0.05)] transition-all hover:border-[#00d2ff] hover:-translate-y-[5px]">
                  <div className="text-[30px] text-[#00d2ff] mb-[20px]">
                    <Zap size={30} />
                  </div>
                  <h3 className="text-[20px] mb-[10px] font-bold">Instant Payouts</h3>
                  <p className="text-[#a0aec0] text-[14px] leading-[1.6]">Win cash prizes and withdraw instantly via UPI or bank transfer within minutes of match completion.</p>
                </div>

                <div className="card bg-[#0f172a] p-[30px] rounded-[15px] border border-[rgba(255,255,255,0.05)] transition-all hover:border-[#00d2ff] hover:-translate-y-[5px]">
                  <div className="text-[30px] text-[#00d2ff] mb-[20px]">
                    <ShieldCheck size={30} />
                  </div>
                  <h3 className="text-[20px] mb-[10px] font-bold">Anti-Cheat Protection</h3>
                  <p className="text-[#a0aec0] text-[14px] leading-[1.6]">Strict spectator monitoring and automated device checks ensure 100% fair play in every lobby.</p>
                </div>

                <div className="card bg-[#0f172a] p-[30px] rounded-[15px] border border-[rgba(255,255,255,0.05)] transition-all hover:border-[#00d2ff] hover:-translate-y-[5px]">
                  <div className="text-[30px] text-[#00d2ff] mb-[20px]">
                    <Award size={30} />
                  </div>
                  <h3 className="text-[20px] mb-[10px] font-bold">Clash Squad Cups</h3>
                  <p className="text-[#a0aec0] text-[14px] leading-[1.6]">Assemble your 4-player squad and battle in bracket-style 4v4 Clash Squad championship tournaments.</p>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* MY MATCHES TAB */}
        {activeTab === 'mymeches' && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-10">
              <span className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider">Player Hub</span>
              <h1 className="text-3xl font-extrabold mt-1">My Registered Matches & Room Credentials</h1>
              <p className="text-gray-400 mt-1">View your assigned slot numbers and get Room ID & Passwords before match start.</p>
            </div>

            {registeredTeams.length === 0 ? (
              <div className="text-center py-20 bg-[#0f172a] rounded-2xl border border-white/5">
                <Gamepad2 size={48} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-lg font-bold mb-1">No Active Registrations</h3>
                <p className="text-gray-400 text-sm mb-6">You haven't registered for any tournaments yet.</p>
                <button 
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-[#00d2ff] to-[#0072ff] text-black font-bold rounded-xl text-sm"
                >
                  Register Now
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {registeredTeams.map((reg, idx) => (
                  <div key={idx} className="bg-[#0f172a] rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] text-xs font-bold rounded-full">
                          Slot #{reg.slotNumber}
                        </span>
                        <span className="text-xs text-gray-400">Registered: {reg.registeredAt}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{reg.tournamentTitle}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">
                        <span>IGN: <strong className="text-white">{reg.ign}</strong></span>
                        <span>UID: <strong className="text-white">{reg.uid}</strong></span>
                        {reg.teamName && <span>Team: <strong className="text-white">{reg.teamName}</strong></span>}
                      </div>
                    </div>

                    <div className="bg-[#1e293b] p-4 rounded-xl border border-white/5 flex flex-col gap-2 w-full md:w-auto min-w-[220px]">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Custom Room Credentials</div>
                      <div className="flex items-center justify-between gap-4 text-sm font-mono">
                        <span className="text-gray-400 flex items-center gap-1"><Key size={14} className="text-[#00d2ff]" /> ID:</span>
                        <span className="font-bold text-white bg-black/40 px-2 py-0.5 rounded">{reg.roomId}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-sm font-mono">
                        <span className="text-gray-400 flex items-center gap-1"><Key size={14} className="text-[#00d2ff]" /> Pass:</span>
                        <span className="font-bold text-emerald-400 bg-black/40 px-2 py-0.5 rounded">{reg.roomPass}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-1">Quick Tournament Registration</h3>
            <p className="text-xs text-[#00d2ff] mb-6">Enter your Free Fire details below</p>

            {successMessage ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-center font-medium text-sm flex flex-col items-center gap-2">
                <CheckCircle2 size={32} />
                {successMessage}
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Select Tournament</label>
                  <select 
                    value={selectedMatchTitle}
                    onChange={(e) => setSelectedMatchTitle(e.target.value)}
                    className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d2ff] text-white"
                  >
                    <option value="Daily Full Map Bermuda Scrims #402">Daily Full Map Bermuda Scrims #402</option>
                    <option value="Clash Squad 4v4 Pro Championship">Clash Squad 4v4 Pro Championship</option>
                    <option value="Solo Rush Bermuda 500 Kill Challenge">Solo Rush Bermuda 500 Kill Challenge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">In-Game Name (IGN)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. ARãƒ»KILLER"
                    value={ign}
                    onChange={(e) => setIgn(e.target.value)}
                    className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d2ff] text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Free Fire UID</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 482910482"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d2ff] text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Team Name (Optional for Solo)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. AR LEGENDS"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d2ff] text-white"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#00d2ff] to-[#0072ff] text-black font-bold rounded-xl text-sm shadow-[0_0_15px_rgba(0,210,255,0.3)] hover:opacity-90 transition-all"
                  >
                    Confirm Registration
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Community Footer */}
      <footer className="py-[40px] px-[8%] text-center bg-[#070a12] border-t border-[rgba(255,255,255,0.05)]">
        <div className="social-buttons flex justify-center gap-[20px] mb-[20px]">
          <a 
            href="https://t.me/AR_Esport_support_care" 
            className="social-btn telegram bg-[#0088cc] text-white px-[20px] py-[10px] rounded-[8px] font-semibold flex items-center gap-[8px] text-[14px] text-decoration-none shadow-md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-telegram"></i> Telegram
          </a>
          <a 
            href="https://www.instagram.com/ar__esports_?stkn=eWk5amY0bTg1a200" 
            className="social-btn instagram bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] text-white px-[20px] py-[10px] rounded-[8px] font-semibold flex items-center gap-[8px] text-[14px] text-decoration-none shadow-md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i> Instagram
          </a>
        </div>
        <div className="text-xs text-gray-600">
          Â© 2026 AR Esports. All rights reserved. Not affiliated with Garena Free Fire.
        </div>
      </footer>

    </div>
  );
}
