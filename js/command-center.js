/**
 * ROHIT.OS — COMMAND CENTER & CLI PALETTE
 * Natural-language command parser, interactive terminal modal, and shortcut bindings.
 */

class CommandCenter {
  constructor() {
    this.modal = document.getElementById('command-center-modal');
    this.input = document.getElementById('cmd-input-field');
    this.resultsList = document.getElementById('cmd-results-list');
    this.chipsContainer = document.getElementById('cmd-quick-chips');
    this.isOpen = false;
    this.selectedIndex = 0;
    this.filteredCommands = [];
    this.commands = window.ROHIT_DATA ? window.ROHIT_DATA.commands : [];

    this.init();
  }

  init() {
    if (!this.modal) return;
    this.bindEvents();
    this.renderChips();
    this.renderResults('');
  }

  bindEvents() {
    // Open on CTRL+K or CMD+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Input change and keyboard navigation
    if (this.input) {
      this.input.addEventListener('input', (e) => {
        this.selectedIndex = 0;
        this.renderResults(e.target.value.trim().toLowerCase());
      });

      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredCommands.length - 1);
          this.updateSelectionHighlight();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
          this.updateSelectionHighlight();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (this.filteredCommands[this.selectedIndex]) {
            this.executeAction(this.filteredCommands[this.selectedIndex].action);
          } else if (this.input.value.trim()) {
            this.parseFuzzy(this.input.value.trim());
          }
        }
      });
    }

    // Trigger button clicks
    document.querySelectorAll('.cmd-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => this.open());
    });
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  open() {
    this.isOpen = true;
    this.modal.classList.add('open');
    if (window.rohitAudio) window.rohitAudio.playWarp();
    if (this.input) {
      this.input.value = '';
      setTimeout(() => this.input.focus(), 60);
      this.renderResults('');
    }
  }

  close() {
    this.isOpen = false;
    this.modal.classList.remove('open');
    if (window.rohitAudio) window.rohitAudio.playClick();
  }

  renderChips() {
    if (!this.chipsContainer) return;
    const suggestions = ['projects', 'skills', 'resume', 'contact', 'github', 'sound on'];
    this.chipsContainer.innerHTML = '';
    suggestions.forEach(cmd => {
      const chip = document.createElement('button');
      chip.className = 'cmd-chip';
      chip.textContent = `/${cmd}`;
      chip.addEventListener('click', () => {
        if (this.input) this.input.value = cmd;
        this.parseFuzzy(cmd);
      });
      this.chipsContainer.appendChild(chip);
    });
  }

  renderResults(query) {
    if (!this.resultsList) return;
    this.resultsList.innerHTML = '';

    if (!query) {
      this.filteredCommands = this.commands.slice(0, 10);
    } else {
      this.filteredCommands = this.commands.filter(c => 
        c.trigger.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query)
      );
    }

    if (this.filteredCommands.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'cmd-result-item';
      emptyLi.innerHTML = `<span class="cmd-item-desc">No direct directive matches "${query}". Press Enter to query AI heuristic...</span>`;
      this.resultsList.appendChild(emptyLi);
      return;
    }

    this.filteredCommands.forEach((cmd, idx) => {
      const li = document.createElement('li');
      li.className = `cmd-result-item ${idx === this.selectedIndex ? 'selected' : ''}`;
      li.innerHTML = `
        <span class="cmd-item-trigger">> ${cmd.trigger}</span>
        <span class="cmd-item-desc">${cmd.desc}</span>
      `;
      li.addEventListener('mouseenter', () => {
        this.selectedIndex = idx;
        this.updateSelectionHighlight();
      });
      li.addEventListener('click', () => {
        this.executeAction(cmd.action);
      });
      this.resultsList.appendChild(li);
    });
  }

  updateSelectionHighlight() {
    const items = this.resultsList.querySelectorAll('.cmd-result-item');
    items.forEach((item, idx) => {
      if (idx === this.selectedIndex) item.classList.add('selected');
      else item.classList.remove('selected');
    });
  }

  parseFuzzy(rawText) {
    const q = rawText.toLowerCase();
    if (q.includes('project') || q.includes('work')) this.executeAction('NAV_PROJECTS');
    else if (q.includes('skill') || q.includes('tech') || q.includes('c') || q.includes('ai')) this.executeAction('NAV_CAPABILITY');
    else if (q.includes('who') || q.includes('about') || q.includes('identity')) this.executeAction('NAV_IDENTITY');
    else if (q.includes('resume') || q.includes('cv')) this.executeAction('OPEN_RESUME');
    else if (q.includes('contact') || q.includes('email') || q.includes('message')) this.executeAction('NAV_TRANSMISSION');
    else if (q.includes('github') || q.includes('code') || q.includes('repo')) this.executeAction('OPEN_GITHUB');
    else if (q.includes('insta')) this.executeAction('OPEN_INSTAGRAM');
    else if (q.includes('sound on') || q.includes('audio on')) this.executeAction('SOUND_ON');
    else if (q.includes('sound off') || q.includes('mute')) this.executeAction('SOUND_OFF');
    else if (q.includes('shutdown') || q.includes('exit') || q.includes('power off')) this.executeAction('SHUTDOWN');
    else if (q.includes('reboot') || q.includes('restart')) this.executeAction('REBOOT');
    else this.executeAction('HELP');
  }

  executeAction(action) {
    if (window.rohitAudio) window.rohitAudio.playClick();
    this.close();

    switch (action) {
      case 'NAV_PROJECTS':
        this.scrollToSection('project-archive');
        break;
      case 'NAV_IDENTITY':
        this.scrollToSection('identity');
        break;
      case 'NAV_CAPABILITY':
        this.scrollToSection('capability');
        break;
      case 'NAV_JOURNEY':
        this.scrollToSection('journey');
        break;
      case 'NAV_MISSIONS':
        this.scrollToSection('mission-archive');
        break;
      case 'NAV_TRANSMISSION':
        this.scrollToSection('transmission');
        break;
      case 'OPEN_RESUME':
        if (window.rohitApp) window.rohitApp.openResumeModal();
        break;
      case 'OPEN_GITHUB':
        window.open(window.ROHIT_DATA.socials.github.url, '_blank', 'noopener');
        break;
      case 'OPEN_INSTAGRAM':
        window.open(window.ROHIT_DATA.socials.instagram.url, '_blank', 'noopener');
        break;
      case 'SOUND_ON':
        if (window.rohitAudio) window.rohitAudio.setSound(true);
        if (window.rohitApp) window.rohitApp.updateSoundButtonUI(true);
        break;
      case 'SOUND_OFF':
        if (window.rohitAudio) window.rohitAudio.setSound(false);
        if (window.rohitApp) window.rohitApp.updateSoundButtonUI(false);
        break;
      case 'PERF_HIGH':
        if (window.perfMonitor) window.perfMonitor.setMode('HIGH');
        break;
      case 'PERF_ECO':
        if (window.perfMonitor) window.perfMonitor.setMode('ECO');
        break;
      case 'SHUTDOWN':
        if (window.rohitApp) window.rohitApp.triggerShutdownSequence();
        break;
      case 'REBOOT':
        if (window.rohitApp) window.rohitApp.triggerReboot();
        break;
      case 'HELP':
      default:
        this.scrollToSection('universe');
        break;
    }
  }

  scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

window.CommandCenter = CommandCenter;
