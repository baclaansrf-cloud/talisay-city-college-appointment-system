const sampleAppointments = [
  {
    title: 'Guidance Counseling',
    date: 'May 27, 2024 (Mon)',
    time: '10:00 AM',
    location: 'Guidance Office',
    status: 'Confirmed',
  },
  {
    title: 'Registrar',
    date: 'May 30, 2024 (Thu)',
    time: '9:00 AM',
    location: 'Registrar Office',
    status: 'Confirmed',
  },
  {
    title: 'Library Services',
    date: 'June 3, 2024 (Mon)',
    time: '10:00 AM',
    location: 'Library',
    status: 'Cancelled',
  },
];

const panels = {
  home: document.getElementById('home-panel'),
  login: document.getElementById('login-panel'),
  dashboard: document.getElementById('dashboard-panel'),
  booking: document.getElementById('booking-panel'),
  schedule: document.getElementById('schedule-panel'),
  confirmation: document.getElementById('confirmation-panel'),
  appointments: document.getElementById('appointments-panel'),
  services: document.getElementById('services-panel'),
  announcements: document.getElementById('announcements-panel'),
  contact: document.getElementById('contact-panel'),
  admin: document.getElementById('admin-panel'),
};

function showPanel(name) {
  Object.values(panels).forEach((panel) => {
    panel.classList.remove('active-panel');
  });

  if (panels[name]) {
    panels[name].classList.add('active-panel');
  }
}

function renderAppointments() {
  const appointmentsList = document.getElementById('appointmentsList');
  if (!appointmentsList) return;

  appointmentsList.innerHTML = sampleAppointments
    .map(
      (appt) => `
        <div class="appointment-item">
          <div class="appointment-header">
            <h4>${appt.title}</h4>
            <span class="badge">${appt.status}</span>
          </div>
          <div class="meta-row">
            <span>${appt.date}</span>
            <span>${appt.time}</span>
          </div>
          <div class="meta-row">
            <span>${appt.location}</span>
            <button class="secondary-btn">View</button>
          </div>
        </div>
      `
    )
    .join('');
}

function attachEvents() {
  const loginBtn = document.getElementById('headerLoginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => showPanel('login'));
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      if (!email || !password) {
        alert('Please enter your email and password.');
        return;
      }

      showPanel('dashboard');
    });
  }

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      showPanel('confirmation');
    });
  }

  const viewMyAppointmentsBtn = document.getElementById('viewMyAppointmentsBtn');
  if (viewMyAppointmentsBtn) {
    viewMyAppointmentsBtn.addEventListener('click', () => showPanel('appointments'));
  }

  document.querySelectorAll('.side-link').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.side-link').forEach((item) => item.classList.remove('active'));
      link.classList.add('active');

      const text = link.textContent.trim().toLowerCase();
      if (text.includes('dashboard')) showPanel('dashboard');
      else if (text.includes('book')) showPanel('booking');
      else if (text.includes('appointment')) showPanel('appointments');
      else if (text.includes('service')) showPanel('services');
      else if (text.includes('announcement')) showPanel('announcements');
    });
  });

  document.querySelectorAll('.tab-btn').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

renderAppointments();
attachEvents();
