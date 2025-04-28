const studentData = [
    { name: 'ADIEGWU PRECIOUS CHIBUZOR', reg: '20201235202' },
    { name: 'AGUOGA GUY SOMADINA', reg: '20201235202' },
    { name: 'AKANBI GODSGENERAL ADEKEMI', reg: '20201235202' },
    { name: 'ANYAMELE PRAISE IKENNA', reg: '20201235202' },
    { name: 'ETOAMAIHE UGOCHI BLESSING', reg: '20201235202' },
    { name: 'EZIRIM SAMUEL CHIBUNNA', reg: '20201235202' },
    { name: 'OKEREKE CHIDINMA MARY', reg: '20201235202' },
    { name: 'UGWULOR DOMINIC IKENNA', reg: '20201235202' }
  ];

  const studentList = document.getElementById('studentList');
  const buttonGroup = document.getElementById('buttons');
  const hoverBox = document.getElementById('hoverBox');
  const themeToggle = document.getElementById('themeToggle');
  const loader = document.getElementById('loader');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');

  let isFullListShown = false;
  let hideTimer;

  function populateList() {
    if (isFullListShown) return;
  
    studentList.innerHTML = '';
    studentData.forEach((student, i) => {
      const li = document.createElement('li');
      li.style.setProperty('--delay', `${i * 0.1}s`);
      li.innerHTML = `
        <span class="left">${student.name}</span>
        <span class="center">-</span>
        <span class="right">${student.reg}</span>
      `;
      studentList.appendChild(li);
    });
  }
  
  function showFullList() {
    isFullListShown = true;
    studentList.innerHTML = '';
  
    studentData.forEach((student, index) => {
      const li = document.createElement('li');
  
      const left = document.createElement('span');
      left.className = 'left';
      left.textContent = student.name;
  
      const center = document.createElement('span');
      center.className = 'center';
      center.textContent = '-';
  
      const right = document.createElement('span');
      right.className = 'right';
      right.textContent = student.reg;
  
      li.appendChild(left);
      li.appendChild(center);
      li.appendChild(right);
  
      li.style.setProperty('--delay', `${index * 0.1}s`);
      studentList.appendChild(li);
    });
  
    studentList.classList.add('show');
    studentList.classList.remove('hide');
    buttonGroup.classList.add('show');
    buttonGroup.classList.remove('hide');
    
    clearTimeout(hideTimer);
  }

  function hideList() {
    isFullListShown = false;
    studentList.classList.remove('show');
    studentList.innerHTML = '';
  }
  

  function handleHoverLeave() {
    if (isFullListShown) return;

    hideTimer = setTimeout(() => {
      studentList.classList.add('hide');
      studentList.classList.remove('show');
      
      if (isFullListShown) {
        buttonGroup.classList.add('show');
      } else {
        buttonGroup.classList.add('hide');
        buttonGroup.classList.remove('show');
      }
    }, 1000);
  }
  
  function handleHoverEnter() {
    populateList();
    studentList.classList.remove('hide');
    if (!isFullListShown) {
      studentList.classList.add('show');
    }
    buttonGroup.classList.remove('hide');
    buttonGroup.classList.add('show');
    clearTimeout(hideTimer);
  }


  hoverBox.addEventListener('mouseenter', handleHoverEnter);
  hoverBox.addEventListener('mouseleave', handleHoverLeave);

  themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', themeToggle.checked);
  });

  let progress = 0;
  const phrases = [
    "Initializing...",
    "Getting fonts...",
    "Loading students...",
    "Fetching animations...",
    "Finalizing setup..."
  ];

  function simulateLoading() {
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 2;
      if (progress >= 100) progress = 100;
      progressBar.style.width = progress + "%";
      progressText.textContent = phrases[Math.min(Math.floor(progress / 20), 4)] + " " + progress + "%";

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.style.opacity = 0;
          loader.style.visibility = 'hidden';
          document.body.style.overflow = 'auto';
          hoverBox.style.display = 'inline-block';
        }, 800);
      }
    }, 250);
  }

  window.onload = simulateLoading;