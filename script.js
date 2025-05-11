/**
 * Trang Web Chúc Mừng Tốt Nghiệp - JavaScript
 * Phiên bản mới, mã nguồn cấu trúc theo các module chức năng
 */

// ==============================================
// KHỞI TẠO ỨNG DỤNG & BIẾN TOÀN CỤC
// ==============================================
const App = {
    // Biến quản lý trạng thái
    state: {
      currentSection: 0,
      totalSections: 4, // Video, Quiz, Memory Game, Puzzle
    },
    
    // Các đối tượng DOM chính
    elements: {
      sections: document.querySelectorAll('.section'),
      progressBar: document.getElementById('progress-bar'),
      backgroundMusic: document.getElementById('background-music'),
      playButton: document.getElementById('play-button'),
      pauseButton: document.getElementById('pause-button'),
      weatherControls: document.querySelector('.weather-controls'),
      extraControls: document.getElementById('extra-controls'),
    },
    
    // Các module chức năng
    modules: {},
    
    // Khởi tạo ứng dụng
    init() {
      // Thiết lập audio
      this.setupAudio();
      
      // Thiết lập điều khiển thời tiết
      this.setupWeatherControls();
      
      // Khởi tạo tiến trình
      this.updateProgress();
      
      // Khởi tạo các module
      this.initModules();
    },
    
    // Thiết lập điều khiển âm thanh
    setupAudio() {
      const { backgroundMusic, playButton, pauseButton } = this.elements;
      
      // Phát nhạc
      playButton.addEventListener('click', () => {
        backgroundMusic.play().catch(e => {
          console.log('Audio play prevented by browser:', e);
        });
      });
      
      // Tạm dừng nhạc
      pauseButton.addEventListener('click', () => {
        backgroundMusic.pause();
      });
      
      // Thử phát nhạc tự động (có thể bị chặn bởi trình duyệt)
      backgroundMusic.volume = 0.5;
      backgroundMusic.play().catch(e => {
        console.log('Autoplay prevented by browser:', e);
      });
    },
    
    // Thiết lập điều khiển thời tiết
    setupWeatherControls() {
      // Khởi tạo các nút điều khiển thời tiết
      document.querySelectorAll('.weather-button').forEach(button => {
        button.addEventListener('click', () => {
          this.modules.weatherEffect.changeWeather(button.dataset.type);
        });
      });
      
      // Ẩn điều khiển thời tiết ban đầu
      this.elements.weatherControls.style.display = 'none';
    },
    
    // Hiển thị section theo chỉ mục
    showSection(index) {
      // Cập nhật trạng thái hiện tại
      this.state.currentSection = index;
      
      // Cập nhật hiển thị các section
      this.elements.sections.forEach((section, i) => {
        if (i === index) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
      
      // Cập nhật thanh tiến trình
      this.updateProgress();
    },
    
    // Cập nhật thanh tiến trình
    updateProgress() {
      const { currentSection } = this.state;
      const { totalSections } = this.state;
      const progress = ((currentSection + 1) / totalSections) * 100;
      this.elements.progressBar.style.width = `${progress}%`;
    },
    
    // Khởi tạo các module chức năng
    initModules() {
      // Khởi tạo các module
      this.modules.videoSection = VideoSection;
      this.modules.quizSection = QuizSection;
      this.modules.memoryGame = MemoryGame;
      this.modules.puzzleGame = PuzzleGame;
      this.modules.passwordScreen = PasswordScreen;
      this.modules.gallery3D = Gallery3D;
      this.modules.karaoke = Karaoke;
      this.modules.certificate = Certificate;
      this.modules.weatherEffect = WeatherEffect;
      this.modules.fireworks = Fireworks3D;
      this.modules.extraControls = ExtraControls;
      
      // Khởi chạy các module
      Object.values(this.modules).forEach(module => {
        if (typeof module.init === 'function') {
          module.init();
        }
      });
    }
  };
  
  // ==============================================
  // MODULE: SECTION VIDEO
  // ==============================================
  const VideoSection = {
    init() {
      const videoCompleteBtn = document.getElementById('video-complete-btn');
      
      videoCompleteBtn.addEventListener('click', () => {
        // Chuyển đến section tiếp theo
        App.showSection(App.state.currentSection + 1);
        
        // Bắt đầu trắc nghiệm
        QuizSection.showQuestion();
      });
    }
  };
  
  // ==============================================
  // MODULE: QUIZ SECTION
  // ==============================================
  const QuizSection = {
    // Dữ liệu trắc nghiệm
    data: {
      questions: [
        {
          question: "Nữ và Như tốt nghiệp ngành gì?",
          options: ["Công nghệ thông tin", "Thiết kế đồ họa", "Quản trị kinh doanh", "Marketing"],
          correct: 1
        },
        {
          question: "Nữ và Như đã học mấy năm tại FPT Polytechnic?",
          options: ["1 năm", "2 năm", "3 năm", "4 năm"],
          correct: 1
        },
        {
          question: "Hai bạn đã thực hiện đồ án tốt nghiệp về chủ đề gì?",
          options: ["Thiết kế website", "Thiết kế nhân vật game", "Thiết kế bộ nhận diện thương hiệu", "Thiết kế ứng dụng di động"],
          correct: 2
        }
      ],
      currentQuestion: 0,
      score: 0
    },
    
    // Các phần tử DOM
    elements: {
      container: document.getElementById('quiz-container'),
      question: document.getElementById('question'),
      options: document.getElementById('options'),
      nextButton: document.getElementById('next-question'),
      quizResult: document.getElementById('quiz-result')
    },
    
    // Khởi tạo module
    init() {
      // Gắn sự kiện cho nút chuyển câu hỏi
      this.elements.nextButton.addEventListener('click', () => {
        this.data.currentQuestion++;
        this.showQuestion();
      });
    },
    
    // Hiển thị câu hỏi hiện tại
    showQuestion() {
      const { question, options, nextButton, quizResult } = this.elements;
      const { questions, currentQuestion } = this.data;
      
      if (currentQuestion < questions.length) {
        const currentQuiz = questions[currentQuestion];
        
        // Hiển thị câu hỏi
        question.textContent = currentQuiz.question;
        
        // Tạo các phương án
        options.innerHTML = '';
        currentQuiz.options.forEach((option, index) => {
          const optionElement = document.createElement('div');
          optionElement.className = 'option';
          optionElement.textContent = option;
          optionElement.dataset.index = index;
          optionElement.addEventListener('click', e => this.checkAnswer(e));
          options.appendChild(optionElement);
        });
        
        // Ẩn nút tiếp theo và kết quả
        nextButton.style.display = 'none';
        quizResult.style.display = 'none';
      }
    },
    
    // Kiểm tra câu trả lời
    checkAnswer(e) {
      const selectedOption = e.target;
      const selectedAnswer = parseInt(selectedOption.dataset.index);
      const { questions, currentQuestion } = this.data;
      const correctAnswer = questions[currentQuestion].correct;
      const { nextButton, quizResult, options } = this.elements;
      
      // Vô hiệu hóa tất cả các phương án
      options.querySelectorAll('.option').forEach(option => {
        option.removeEventListener('click', this.checkAnswer);
        option.style.cursor = 'default';
      });
      
      // Kiểm tra đáp án
      if (selectedAnswer === correctAnswer) {
        selectedOption.classList.add('correct');
        quizResult.textContent = 'Đúng rồi! +1 điểm';
        quizResult.style.color = '#28a745';
        this.data.score++;
      } else {
        selectedOption.classList.add('incorrect');
        options.querySelectorAll('.option')[correctAnswer].classList.add('correct');
        quizResult.textContent = 'Sai rồi!';
        quizResult.style.color = '#dc3545';
      }
      
      // Hiển thị kết quả
      quizResult.style.display = 'block';
      
      // Xử lý tiếp theo
      if (currentQuestion < questions.length - 1) {
        nextButton.style.display = 'block';
      } else {
        // Hoàn thành trắc nghiệm
        setTimeout(() => {
          this.showFinalResult();
        }, 1500);
      }
    },
    
    // Hiển thị kết quả cuối cùng
    showFinalResult() {
      const { score, questions } = this.data;
      const { container } = this.elements;
      
      container.innerHTML = `
        <h2 style="color: #ff6f91; text-align: center;">Kết Quả Trắc Nghiệm</h2>
        <p style="font-size: 1.2em; text-align: center;">Bạn đã trả lời đúng ${score}/${questions.length} câu hỏi!</p>
        <button class="button" id="continue-after-quiz">Tiếp tục hành trình!</button>
      `;
      
      document.getElementById('continue-after-quiz').addEventListener('click', () => {
        // Chuyển đến phần tiếp theo
        App.showSection(App.state.currentSection + 1);
      });
    }
  };
  
  // ==============================================
  // MODULE: MEMORY GAME
  // ==============================================
  const MemoryGame = {
    // Dữ liệu game
    data: {
      emojis: ['🎓', '🎉', '🎊', '💖', '✨', '🌟', '📚', '🎯'],
      flippedCards: [],
      matchedPairs: 0,
      canFlip: true
    },
    
    // Các phần tử DOM
    elements: {
      gameContainer: document.querySelector('.memory-game'),
      scoreDisplay: document.getElementById('memory-score')
    },
    
    // Khởi tạo module
    init() {
      this.createCards();
    },
    
    // Tạo các thẻ bài
    createCards() {
      const { gameContainer } = this.elements;
      const { emojis } = this.data;
      
      // Tạo mảng chứa tất cả các emoji (mỗi emoji 2 lần)
      const allCards = [...emojis, ...emojis];
      
      // Xáo trộn mảng
      const shuffledCards = this.shuffleArray(allCards);
      
      // Xóa các thẻ cũ
      gameContainer.innerHTML = '';
      
      // Tạo các thẻ bài
      shuffledCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.value = emoji;
        card.dataset.index = index;
        
        const front = document.createElement('div');
        front.className = 'memory-card-front';
        front.textContent = '?';
        
        const back = document.createElement('div');
        back.className = 'memory-card-back';
        back.textContent = emoji;
        
        card.appendChild(front);
        card.appendChild(back);
        
        card.addEventListener('click', e => this.flipCard(e));
        gameContainer.appendChild(card);
      });
    },
    
    // Xáo trộn mảng
    shuffleArray(array) {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    },
    
    // Lật thẻ bài
    flipCard(e) {
      const card = e.currentTarget;
      const { flippedCards, canFlip } = this.data;
      
      // Kiểm tra xem có thể lật được thẻ hay không
      if (!canFlip || flippedCards.includes(card) || card.classList.contains('flipped')) {
        return;
      }
      
      // Lật thẻ
      card.classList.add('flipped');
      flippedCards.push(card);
      
      // Nếu đã lật 2 thẻ, kiểm tra khớp
      if (flippedCards.length === 2) {
        this.data.canFlip = false;
        this.checkForMatch();
      }
    },
    
    // Kiểm tra cặp thẻ trùng khớp
    checkForMatch() {
      const [card1, card2] = this.data.flippedCards;
      const { scoreDisplay } = this.elements;
      
      if (card1.dataset.value === card2.dataset.value) {
        // Tìm thấy cặp trùng khớp
        this.data.flippedCards = [];
        this.data.canFlip = true;
        this.data.matchedPairs++;
        
        // Cập nhật điểm số
        scoreDisplay.textContent = `Số cặp đã tìm thấy: ${this.data.matchedPairs}/8`;
        
        // Kiểm tra hoàn thành
        if (this.data.matchedPairs === 8) {
          setTimeout(() => {
            this.completeGame();
          }, 1000);
        }
      } else {
        // Không trùng khớp
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          this.data.flippedCards = [];
          this.data.canFlip = true;
        }, 1000);
      }
    },
    
    // Hoàn thành trò chơi
    completeGame() {
      const container = document.querySelector('#section-memory');
      
      container.innerHTML = `
        <h2 class="section-title">Tuyệt vời!</h2>
        <p class="section-description">Bạn đã tìm thấy tất cả các cặp!</p>
        <button class="button" id="continue-after-memory">Tiếp tục hành trình!</button>
      `;
      
      document.getElementById('continue-after-memory').addEventListener('click', () => {
        // Chuyển đến phần tiếp theo
        App.showSection(App.state.currentSection + 1);
        
        // Bắt đầu đếm giờ cho trò chơi ghép hình
        PuzzleGame.startTimer();
      });
    }
  };
  
  // ==============================================
  // MODULE: PUZZLE GAME
  // ==============================================
  const PuzzleGame = {
    // Dữ liệu game
    data: {
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      pieces: [],
      timeLeft: 60,
      gameActive: true,
      skipAttempts: 0,
      timerInterval: null,
      draggedPiece: null,
      initialX: 0,
      initialY: 0
    },
    
    // Các phần tử DOM
    elements: {
      container: document.getElementById('puzzle-container'),
      timerDisplay: document.getElementById('timer'),
      hintButton: document.getElementById('hint-button'),
      retryButton: document.getElementById('retry-button'),
      skipButton: document.getElementById('skip-button'),
      hintImage: document.getElementById('hint-image')
    },
    
    // Khởi tạo module
    init() {
      const { hintButton, retryButton, skipButton } = this.elements;
      
      // Tạo các mảnh ghép
      this.createPuzzlePieces();
      
      // Gắn sự kiện cho nút gợi ý
      hintButton.addEventListener('click', () => {
        this.showHint();
      });
      
      // Gắn sự kiện cho nút thử lại
      retryButton.addEventListener('click', () => {
        this.retryGame();
      });
      
      // Gắn sự kiện cho nút bỏ qua
      skipButton.addEventListener('click', () => {
        this.skipGame();
      });
    },
    
    // Tạo các mảnh ghép
    createPuzzlePieces() {
      const { container } = this.elements;
      const { imageUrl } = this.data;
      
      // Xóa mảnh cũ
      this.data.pieces = [];
      container.innerHTML = '';
      
      // Vị trí bố cục của 9 mảnh ghép
      const positions = [
        { x: 0, y: 0 }, { x: -100, y: 0 }, { x: -200, y: 0 },
        { x: 0, y: -100 }, { x: -100, y: -100 }, { x: -200, y: -100 },
        { x: 0, y: -200 }, { x: -100, y: -200 }, { x: -200, y: -200 }
      ];
      
      // Xáo trộn vị trí
      const shuffledPositions = this.shuffleArray([...positions]);
      
      // Tạo các mảnh ghép
      positions.forEach((originalPos, i) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundPosition = `${originalPos.x}px ${originalPos.y}px`;
        piece.dataset.correctIndex = i;
        
        // Tìm vị trí xáo trộn của mảnh ghép
        const shuffledIndex = shuffledPositions.findIndex(
          pos => pos.x === originalPos.x && pos.y === originalPos.y
        );
        
        piece.dataset.currentIndex = shuffledIndex;
        piece.draggable = true;
        container.appendChild(piece);
        this.data.pieces.push(piece);
      });
      
      // Thiết lập kéo thả
      this.setupDragAndDrop();
    },
    
    // Xáo trộn mảng
    shuffleArray(array) {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    },
    
    // Thiết lập kéo thả
    setupDragAndDrop() {
      // Thiết lập cho mỗi mảnh ghép
      this.data.pieces.forEach(piece => {
        // Sự kiện kéo cho desktop
        piece.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', piece.dataset.currentIndex);
          piece.style.opacity = '0.5';
        });
        
        piece.addEventListener('dragend', () => {
          piece.style.opacity = '1';
        });
        
        piece.addEventListener('dragover', (e) => {
          e.preventDefault();
        });
        
        piece.addEventListener('drop', (e) => {
          e.preventDefault();
          const draggedIndex = e.dataTransfer.getData('text/plain');
          const targetIndex = piece.dataset.currentIndex;
          
          // Hoán đổi vị trí
          this.swapPieces(draggedIndex, targetIndex);
        });
        
        // Sự kiện cảm ứng cho mobile
        piece.addEventListener('touchstart', (e) => this.handleTouchStart(e, piece));
        piece.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        piece.addEventListener('touchend', (e) => this.handleTouchEnd(e));
      });
    },
    
    // Xử lý sự kiện cảm ứng bắt đầu
    handleTouchStart(e, piece) {
      e.preventDefault();
      
      // Lưu mảnh ghép đang kéo
      this.data.draggedPiece = piece;
      
      const rect = piece.getBoundingClientRect();
      const touch = e.touches[0];
      
      // Lưu vị trí ban đầu
      this.data.initialX = touch.clientX - rect.left;
      this.data.initialY = touch.clientY - rect.top;
      
      // Thiết lập style khi kéo
      piece.style.position = 'absolute';
      piece.style.zIndex = '1000';
      piece.style.opacity = '0.8';
    },
    
    // Xử lý sự kiện cảm ứng di chuyển
    handleTouchMove(e) {
      const { draggedPiece, initialX, initialY } = this.data;
      
      if (!draggedPiece) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      
      // Cập nhật vị trí
      draggedPiece.style.left = `${touch.clientX - initialX}px`;
      draggedPiece.style.top = `${touch.clientY - initialY}px`;
    },
    
    // Xử lý sự kiện cảm ứng kết thúc
    handleTouchEnd(e) {
      const { draggedPiece } = this.data;
      
      if (!draggedPiece) return;
      e.preventDefault();
      
      // Thiết lập lại style
      draggedPiece.style.position = '';
      draggedPiece.style.zIndex = '';
      draggedPiece.style.opacity = '1';
      draggedPiece.style.left = '';
      draggedPiece.style.top = '';
      
      // Tìm mảnh ghép ở vị trí thả
      const touch = e.changedTouches[0];
      const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
      
      if (targetElement && 
          targetElement.classList.contains('puzzle-piece') && 
          targetElement !== draggedPiece) {
        // Hoán đổi vị trí
        this.swapPieces(draggedPiece.dataset.currentIndex, targetElement.dataset.currentIndex);
      }
      
      // Xóa mảnh ghép đang kéo
      this.data.draggedPiece = null;
    },
    
    // Hoán đổi vị trí hai mảnh ghép
    swapPieces(index1, index2) {
      const { pieces } = this.data;
      
      // Tìm các mảnh ghép
      const piece1 = pieces.find(p => p.dataset.currentIndex === index1);
      const piece2 = pieces.find(p => p.dataset.currentIndex === index2);
      
      if (piece1 && piece2) {
        // Hoán đổi vị trí
        const tempIndex = piece2.dataset.currentIndex;
        piece2.dataset.currentIndex = piece1.dataset.currentIndex;
        piece1.dataset.currentIndex = tempIndex;
        
        // Cập nhật vị trí
        this.updatePiecePositions();
        
        // Kiểm tra hoàn thành
        this.checkWin();
      }
    },
    
    // Cập nhật vị trí các mảnh ghép
    updatePiecePositions() {
      const { pieces } = this.data;
      
      const positions = [
        { x: 0, y: 0 }, { x: -100, y: 0 }, { x: -200, y: 0 },
        { x: 0, y: -100 }, { x: -100, y: -100 }, { x: -200, y: -100 },
        { x: 0, y: -200 }, { x: -100, y: -200 }, { x: -200, y: -200 }
      ];
      
      pieces.forEach(piece => {
        const index = parseInt(piece.dataset.currentIndex);
        if (index >= 0 && index < positions.length) {
          const pos = positions[index];
          piece.style.backgroundPosition = `${pos.x}px ${pos.y}px`;
        }
      });
    },
    
    // Kiểm tra hoàn thành
    checkWin() {
      const { pieces, gameActive } = this.data;
      
      // Kiểm tra xem tất cả các mảnh ghép đã đúng vị trí chưa
      const isCorrect = pieces.every(piece => {
        return parseInt(piece.dataset.currentIndex) === parseInt(piece.dataset.correctIndex);
      });
      
      if (isCorrect && gameActive) {
        // Dừng game
        this.data.gameActive = false;
        clearInterval(this.data.timerInterval);
        
        // Hiển thị thông báo hoàn thành
        this.showCompletionMessage();
      }
    },
    
    // Hiển thị thông báo hoàn thành
    showCompletionMessage() {
      const puzzleSection = document.getElementById('section-puzzle');
      
      puzzleSection.innerHTML = `
        <h2 class="section-title">Tuyệt vời!</h2>
        <p class="section-description">Bạn đã hoàn thành ghép hình!</p>
        <button class="button" id="continue-after-puzzle">Mở thiệp chúc mừng!</button>
      `;
      
      document.getElementById('continue-after-puzzle').addEventListener('click', () => {
        // Hiển thị màn hình nhập mật khẩu
        PasswordScreen.show();
      });
    },
    
    // Hiển thị gợi ý
    showHint() {
      const { hintImage } = this.elements;
      
      hintImage.style.display = 'block';
      setTimeout(() => {
        hintImage.style.display = 'none';
      }, 2000);
    },
    
    // Thử lại trò chơi
    retryGame() {
      const { retryButton, skipButton, timerDisplay } = this.elements;
      
      // Thiết lập lại trạng thái
      this.data.gameActive = true;
      retryButton.style.display = 'none';
      skipButton.style.display = 'none';
      timerDisplay.style.color = '#ff6f91';
      
      // Tạo lại các mảnh ghép
      this.createPuzzlePieces();
      
      // Bắt đầu đếm giờ
      this.startTimer();
    },
    
    // Bỏ qua trò chơi
    skipGame() {
      const { skipAttempts } = this.data;
      this.data.skipAttempts++;
      
      if (skipAttempts === 0) {
        alert('Hihi, cố lên chút nữa đi! 😜');
      } else if (skipAttempts === 1) {
        alert('Thật sự muốn bỏ qua à? Tạm thời dễ dàng cho bạn nha! 😊');
        this.data.timeLeft = 10; // Giảm thời gian để kết thúc sớm
      } else {
        // Dừng game
        this.data.gameActive = false;
        clearInterval(this.data.timerInterval);
        
        // Hiển thị thông báo bỏ qua
        const puzzleSection = document.getElementById('section-puzzle');
        
        puzzleSection.innerHTML = `
          <h2 class="section-title">Đã bỏ qua!</h2>
          <p class="section-description">Bạn đã bỏ qua phần ghép hình.</p>
          <p class="section-description" style="color: #ff4d79; font-style: italic; font-weight: bold;">
            Để vậy cho vui thôi chứ ghép không được đâu lêu lêu 😜
          </p>
          <button class="button" id="continue-after-puzzle">Mở thiệp chúc mừng!</button>
        `;
        
        document.getElementById('continue-after-puzzle').addEventListener('click', () => {
          // Hiển thị màn hình nhập mật khẩu
          PasswordScreen.show();
        });
      }
    },
    // Bắt đầu đếm giờ
  startTimer() {
    // Thiết lập thời gian ban đầu
    this.data.timeLeft = 60;
    this.elements.timerDisplay.textContent = `Thời gian: ${this.data.timeLeft}s`;
    this.elements.timerDisplay.style.color = '#ff6f91';
    
    // Dừng bộ đếm giờ cũ nếu có
    clearInterval(this.data.timerInterval);
    
    // Bắt đầu bộ đếm giờ mới
    this.data.timerInterval = setInterval(() => {
      // Giảm thời gian
      this.data.timeLeft--;
      
      // Cập nhật hiển thị
      this.elements.timerDisplay.textContent = `Thời gian: ${this.data.timeLeft}s`;
      
      // Cảnh báo thời gian sắp hết
      if (this.data.timeLeft <= 10) {
        this.elements.timerDisplay.style.color = '#dc3545';
      }
      
      // Kiểm tra hết giờ
      if (this.data.timeLeft <= 0) {
        // Dừng đếm giờ
        clearInterval(this.data.timerInterval);
        
        // Hiển thị nút thử lại và bỏ qua
        this.elements.retryButton.style.display = 'inline-block';
        this.elements.skipButton.style.display = 'inline-block';
        
        // Thông báo hết giờ
        this.elements.timerDisplay.textContent = 'Hết giờ!';
      }
    }, 1000);
  }
};

// ==============================================
// MODULE: MÀN HÌNH NHẬP MẬT KHẨU
// ==============================================
const PasswordScreen = {
  // Dữ liệu của module
  data: {
    selectedUser: null,
    passwords: {
      nu: '0123', // Mật khẩu của Nữ (đơn giản hóa thành ngày sinh)
      nhu: '0123'  // Mật khẩu của Như (đơn giản hóa thành ngày sinh)
    }
  },
  
  // Các phần tử DOM
  elements: {
    section: document.getElementById('section-password'),
    form: document.getElementById('password-form'),
    prompt: document.getElementById('password-prompt'),
    input: document.getElementById('password-input'),
    error: document.getElementById('password-error')
  },
  
  // Khởi tạo module
  init() {
    // Gắn sự kiện cho nút chọn người dùng
    document.getElementById('select-nu').addEventListener('click', () => {
      this.selectUser('nu');
    });
    
    document.getElementById('select-nhu').addEventListener('click', () => {
      this.selectUser('nhu');
    });
    
    // Gắn sự kiện cho nút xác nhận mật khẩu
    document.getElementById('verify-password').addEventListener('click', () => {
      this.verifyPassword();
    });
    
    // Gắn sự kiện nhấn Enter cho ô nhập mật khẩu
    this.elements.input.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        this.verifyPassword();
      }
    });
  },
  
  // Hiển thị màn hình nhập mật khẩu
  show() {
    // Ẩn tất cả các section
    App.elements.sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Hiển thị section mật khẩu
    this.elements.section.style.display = 'block';
  },
  
  // Chọn người dùng
  selectUser(user) {
    this.data.selectedUser = user;
    
    // Cập nhật lời nhắc
    if (user === 'nu') {
      this.elements.prompt.textContent = 'Chào Nữ! Hãy nhập mật khẩu của bạn (gợi ý: ngày sinh của bạn - ví dụ: 0123)';
    } else {
      this.elements.prompt.textContent = 'Chào Như! Hãy nhập mật khẩu của bạn (gợi ý: ngày sinh của bạn - ví dụ: 0123)';
    }
    
    // Hiển thị form nhập mật khẩu
    this.elements.form.style.display = 'block';
    
    // Ẩn thông báo lỗi
    this.elements.error.style.display = 'none';
    
    // Focus vào ô nhập mật khẩu
    this.elements.input.focus();
  },
  
  // Xác minh mật khẩu
  verifyPassword() {
    const { input, error } = this.elements;
    const { selectedUser, passwords } = this.data;
    
    // Lấy mật khẩu đã nhập
    const password = input.value.trim();
    
    if (password === passwords[selectedUser]) {
      // Mật khẩu đúng
      // Ẩn thông báo lỗi
      error.style.display = 'none';
      
      // Hiển thị thiệp chúc mừng
      this.showGreetingCards(selectedUser);
    } else {
      // Mật khẩu sai
      error.style.display = 'block';
      
      // Xóa ô nhập mật khẩu
      input.value = '';
      
      // Focus vào ô nhập mật khẩu
      input.focus();
    }
  },
  
  // Hiển thị thiệp chúc mừng
  showGreetingCards(user) {
    // Ẩn section mật khẩu
    this.elements.section.style.display = 'none';
    
    // Hiển thị thiệp chúc mừng
    const cardContainer = document.querySelector('.card-container');
    cardContainer.style.display = 'flex';
    
    // Lọc và hiển thị các thiệp phù hợp
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const title = card.querySelector('h2').textContent.toLowerCase();
      
      if (title.includes(user)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Hiển thị các điều khiển bổ sung
    App.elements.extraControls.style.display = 'block';
    
    // Kích hoạt hiệu ứng pháo hoa
    App.modules.fireworks.start();
  }
};

// ==============================================
// MODULE: GALLERY 3D
// ==============================================
const Gallery3D = {
  // Dữ liệu của module
  data: {
    rotation: 0,
    isActive: false
  },
  
  // Các phần tử DOM
  elements: {
    section: document.getElementById('section-gallery'),
    scene: document.querySelector('.gallery-scene')
  },
  
  // Khởi tạo module
  init() {
    // Gắn sự kiện cho nút hiển thị gallery
    document.getElementById('show-gallery').addEventListener('click', () => {
      this.show();
    });
    
    // Gắn sự kiện cho nút điều khiển
    document.getElementById('gallery-left').addEventListener('click', () => {
      this.rotate(-90);
    });
    
    document.getElementById('gallery-right').addEventListener('click', () => {
      this.rotate(90);
    });
    
    document.getElementById('gallery-exit').addEventListener('click', () => {
      this.hide();
    });
    
    // Thiết lập sự kiện phím mũi tên
    window.addEventListener('keydown', e => {
      if (!this.data.isActive) return;
      
      if (e.key === 'ArrowLeft') {
        this.rotate(-90);
      } else if (e.key === 'ArrowRight') {
        this.rotate(90);
      } else if (e.key === 'Escape') {
        this.hide();
      }
    });
    
    // Sự kiện cảm ứng cho điện thoại
    let touchStartX = 0;
    
    this.elements.scene.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    });
    
    this.elements.scene.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX;
      
      if (diff > 50) {
        // Vuốt phải
        this.rotate(-90);
      } else if (diff < -50) {
        // Vuốt trái
        this.rotate(90);
      }
    });
  },
  
  // Hiển thị gallery
  show() {
    // Ẩn tất cả các section
    App.elements.sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Hiển thị section gallery
    this.elements.section.classList.add('active');
    
    // Cập nhật trạng thái
    this.data.isActive = true;
  },
  
  // Ẩn gallery
  hide() {
    // Ẩn section gallery
    this.elements.section.classList.remove('active');
    
    // Cập nhật trạng thái
    this.data.isActive = false;
  },
  
  // Xoay gallery
  rotate(angle) {
    // Cập nhật góc xoay
    this.data.rotation += angle;
    
    // Áp dụng góc xoay
    this.elements.scene.style.transform = `rotateY(${this.data.rotation}deg)`;
  }
};

// ==============================================
// MODULE: KARAOKE
// ==============================================
const Karaoke = {
  // Dữ liệu của module
  data: {
    lyrics: [
      { time: 0, text: "Chúc mừng bạn đã tốt nghiệp hôm nay" },
      { time: 5, text: "Những năm tháng học tập đã thành công rồi" },
      { time: 10, text: "Giờ đây bạn đã sẵn sàng bước tiếp" },
      { time: 15, text: "Tương lai tươi sáng đang chờ phía trước" },
      { time: 20, text: "FPT Polytechnic đã dạy cho bạn" },
      { time: 25, text: "Những kỹ năng quý giá cho đời" },
      { time: 30, text: "Nữ và Như ơi, hãy luôn tự tin" },
      { time: 35, text: "Chúng tôi luôn tự hào về hai bạn" },
      { time: 40, text: "Giờ đây con đường đã rộng mở" },
      { time: 45, text: "Hãy vững bước và không ngừng phấn đấu" },
      { time: 50, text: "Chúc mừng tốt nghiệp, hô lên nào!" },
      { time: 55, text: "Tốt nghiệp rồi! Hoan hô!" }
    ],
    audio: new Audio('https://www.bensound.com/bensound-music/bensound-happyrock.mp3'),
    currentLine: 0,
    isPlaying: false,
    progressInterval: null
  },
  
  // Các phần tử DOM
  elements: {
    section: document.getElementById('section-karaoke'),
    currentLine: document.querySelector('.current-line'),
    nextLine: document.querySelector('.next-line'),
    progressBar: document.getElementById('karaoke-progress-bar'),
    volumeSlider: document.getElementById('volume-slider')
  },
  
  // Khởi tạo module
  init() {
    // Thiết lập âm lượng ban đầu
    this.data.audio.volume = 0.7;
    
    // Gắn sự kiện cho nút hiển thị karaoke
    document.getElementById('show-karaoke').addEventListener('click', () => {
      this.show();
    });
    
    // Gắn sự kiện cho nút phát/dừng
    document.getElementById('play-karaoke').addEventListener('click', () => {
      this.play();
    });
    
    document.getElementById('stop-karaoke').addEventListener('click', () => {
      this.stop();
    });
    
    // Gắn sự kiện cho thanh điều chỉnh âm lượng
    this.elements.volumeSlider.addEventListener('input', () => {
      const volume = parseFloat(this.elements.volumeSlider.value);
      this.data.audio.volume = volume;
    });
    
    // Gắn sự kiện kết thúc audio
    this.data.audio.addEventListener('ended', () => {
      this.stop();
    });
  },
  
  // Hiển thị karaoke
  show() {
    // Ẩn tất cả các section
    App.elements.sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Hiển thị section karaoke
    this.elements.section.classList.add('active');
    
    // Hiển thị lời bài hát ban đầu
    this.updateLyrics(0);
  },
  
  // Phát karaoke
  play() {
    // Hiển thị/ẩn nút điều khiển
    document.getElementById('play-karaoke').style.display = 'none';
    document.getElementById('stop-karaoke').style.display = 'inline-block';
    
    // Phát nhạc
    this.data.audio.currentTime = 0;
    this.data.audio.play().catch(e => {
      console.log('Audio play prevented by browser:', e);
    });
    
    // Thiết lập trạng thái
    this.data.isPlaying = true;
    this.data.currentLine = 0;
    
    // Cập nhật lời bài hát
    this.updateLyrics(0);
    
    // Bắt đầu kiểm tra tiến độ
    this.startProgressCheck();
  },
  
  // Dừng karaoke
  stop() {
    // Hiển thị/ẩn nút điều khiển
    document.getElementById('play-karaoke').style.display = 'inline-block';
    document.getElementById('stop-karaoke').style.display = 'none';
    
    // Dừng nhạc
    this.data.audio.pause();
    
    // Thiết lập trạng thái
    this.data.isPlaying = false;
    
    // Dừng kiểm tra tiến độ
    clearInterval(this.data.progressInterval);
    
    // Đặt lại thanh tiến trình
    this.elements.progressBar.style.width = '0%';
  },
  
  // Bắt đầu kiểm tra tiến độ
  startProgressCheck() {
    // Dừng interval cũ nếu có
    clearInterval(this.data.progressInterval);
    
    // Tạo interval mới
    this.data.progressInterval = setInterval(() => {
      // Lấy thời gian hiện tại
      const currentTime = this.data.audio.currentTime;
      
      // Tính toán phần trăm tiến độ
      const duration = this.data.audio.duration || 60;
      const progress = (currentTime / duration) * 100;
      
      // Cập nhật thanh tiến trình
      this.elements.progressBar.style.width = `${progress}%`;
      
      // Cập nhật lời bài hát
      this.updateLyricsBasedOnTime(currentTime);
    }, 100);
  },
  
  // Cập nhật lời bài hát dựa trên thời gian
  updateLyricsBasedOnTime(currentTime) {
    const { lyrics } = this.data;
    
    // Tìm dòng lời bài hát hiện tại
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        if (this.data.currentLine !== i) {
          this.data.currentLine = i;
          this.updateLyrics(i);
        }
        break;
      }
    }
  },
  
  // Cập nhật hiển thị lời bài hát
  updateLyrics(index) {
    const { lyrics } = this.data;
    const { currentLine, nextLine } = this.elements;
    
    // Hiển thị dòng hiện tại
    currentLine.textContent = lyrics[index].text;
    
    // Hiển thị dòng tiếp theo nếu có
    if (index < lyrics.length - 1) {
      nextLine.textContent = lyrics[index + 1].text;
    } else {
      nextLine.textContent = '';
    }
  }
};

// ==============================================
// MODULE: CERTIFICATE GENERATOR
// ==============================================
const Certificate = {
  // Dữ liệu của module
  data: {
    currentName: '',
    currentType: '',
    currentMessage: ''
  },
  
  // Các phần tử DOM
  elements: {
    section: document.getElementById('section-certificate'),
    form: document.querySelector('.certificate-form'),
    container: document.querySelector('.certificate-container'),
    certName: document.getElementById('cert-name'),
    certType: document.getElementById('cert-type'),
    certMessage: document.getElementById('cert-message'),
    certDate: document.getElementById('cert-date')
  },
  
  // Khởi tạo module
  init() {
    // Gắn sự kiện cho nút hiển thị certificate
    document.getElementById('show-certificate').addEventListener('click', () => {
      this.show();
    });
    
    // Gắn sự kiện cho nút tạo chứng chỉ
    document.getElementById('generate-certificate').addEventListener('click', () => {
      this.generateCertificate();
    });
    
    // Gắn sự kiện cho nút in chứng chỉ
    document.getElementById('print-certificate').addEventListener('click', () => {
      this.printCertificate();
    });
    
    // Gắn sự kiện cho nút tạo chứng chỉ mới
    document.getElementById('new-certificate').addEventListener('click', () => {
      this.showForm();
    });
  },
  
  // Hiển thị module
  show() {
    // Ẩn tất cả các section
    App.elements.sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Hiển thị section certificate
    this.elements.section.classList.add('active');
    
    // Hiển thị form
    this.showForm();
  },
  
  // Hiển thị form tạo chứng chỉ
  showForm() {
    // Hiển thị form
    this.elements.form.style.display = 'flex';
    
    // Ẩn container chứng chỉ
    this.elements.container.style.display = 'none';
    
    // Xóa dữ liệu cũ
    document.getElementById('certificate-name').value = '';
    document.getElementById('certificate-type').value = '';
    document.getElementById('certificate-message').value = '';
  },
  
  // Tạo chứng chỉ
  generateCertificate() {
    // Lấy dữ liệu từ form
    const name = document.getElementById('certificate-name').value.trim();
    const type = document.getElementById('certificate-type').value;
    const message = document.getElementById('certificate-message').value.trim();
    
    // Kiểm tra dữ liệu
    if (!name || !type) {
      alert('Vui lòng nhập tên và chọn loại chứng chỉ!');
      return;
    }
    
    // Lưu dữ liệu hiện tại
    this.data.currentName = name;
    this.data.currentType = type;
    this.data.currentMessage = message;
    
    // Cập nhật chứng chỉ
    this.elements.certName.textContent = name;
    this.elements.certType.textContent = type;
    this.elements.certMessage.textContent = message;
    
    // Cập nhật ngày tháng
    const date = new Date();
    const formattedDate = `Ngày ${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
    this.elements.certDate.textContent = formattedDate;
    
    // Ẩn form
    this.elements.form.style.display = 'none';
    
    // Hiển thị container chứng chỉ
    this.elements.container.style.display = 'block';
  },
  
  // In chứng chỉ
  printCertificate() {
    // Tạo một cửa sổ mới để in
    const printWindow = window.open('', '_blank');
    
    // Tạo nội dung HTML để in
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Chứng Chỉ - ${this.data.currentName}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            padding: 20px;
          }
          .certificate {
            border: 10px solid #ff6f91;
            padding: 20px;
            width: 600px;
            margin: 0 auto;
            background-color: #fff;
          }
          .certificate-header {
            margin-bottom: 30px;
          }
          .certificate-title {
            font-size: 32px;
            color: #ff6f91;
            margin-bottom: 10px;
          }
          .certificate-subtitle {
            font-size: 20px;
            color: #444;
          }
          .certificate-content {
            margin: 40px 0;
          }
          .certificate-name {
            font-size: 28px;
            color: #333;
            margin-bottom: 20px;
          }
          .certificate-text {
            font-size: 18px;
            line-height: 1.5;
            margin-bottom: 15px;
          }
          .certificate-footer {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
          }
          .certificate-date, .certificate-signature {
            font-size: 16px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="certificate-header">
            <h2 class="certificate-title">Chứng Chỉ Vinh Danh</h2>
            <p class="certificate-subtitle">FPT Polytechnic</p>
          </div>
          
          <div class="certificate-content">
            <h3 class="certificate-name">${this.data.currentName}</h3>
            <p class="certificate-text">
              Được trao danh hiệu "${this.data.currentType}" 
              với lòng biết ơn và sự trân trọng vô cùng.
            </p>
            <p class="certificate-text">${this.data.currentMessage}</p>
          </div>
          
          <div class="certificate-footer">
            <div class="certificate-date">${this.elements.certDate.textContent}</div>
            <div class="certificate-signature">Chữ ký</div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Ghi nội dung vào cửa sổ mới
    printWindow.document.open();
    printWindow.document.write(certificateHTML);
    printWindow.document.close();
    
    // In chứng chỉ
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
};

// ==============================================
// MODULE: WEATHER EFFECT
// ==============================================
const WeatherEffect = {
  // Dữ liệu của module
  data: {
    currentWeather: 'none',
    particles: [],
    isActive: false,
    animationFrame: null
  },
  
  // Các phần tử DOM
  elements: {
    container: document.getElementById('weather-container'),
    controls: document.querySelector('.weather-controls')
  },
  
  // Khởi tạo module
  init() {
    // Gắn sự kiện cho nút hiển thị weather
    document.getElementById('toggle-weather').addEventListener('click', () => {
      this.toggleControls();
    });
    
    // Thiết lập canvas
    this.setupCanvas();
  },
  
  // Thiết lập canvas
  setupCanvas() {
    // Tạo canvas
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Thêm canvas vào container
    this.elements.container.appendChild(this.canvas);
    
    // Thiết lập kích thước canvas
    this.resizeCanvas();
    
    // Gắn sự kiện thay đổi kích thước
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  },
  
  // Thay đổi kích thước canvas
  resizeCanvas() {
    // Thiết lập kích thước canvas bằng kích thước cửa sổ
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },
  
  // Bật/tắt điều khiển thời tiết
  toggleControls() {
    const { controls } = this.elements;
    
    if (controls.style.display === 'none' || !controls.style.display) {
      controls.style.display = 'flex';
    } else {
      controls.style.display = 'none';
    }
  },
  
  // Thay đổi hiệu ứng thời tiết
  changeWeather(type) {
    // Dừng hiệu ứng hiện tại
    this.stopWeather();
    
    // Cập nhật loại thời tiết
    this.data.currentWeather = type;
    
    // Bắt đầu hiệu ứng mới nếu không phải 'none'
    if (type !== 'none') {
      this.startWeather();
    }
  },
  
  // Bắt đầu hiệu ứng thời tiết
  startWeather() {
    const { currentWeather } = this.data;
    
    // Khởi tạo các hạt
    this.data.particles = [];
    
    // Tạo các hạt dựa trên loại thời tiết
    const particleCount = currentWeather === 'hearts' ? 30 : 100;
    
    for (let i = 0; i < particleCount; i++) {
      let particle;
      
      switch (currentWeather) {
        case 'hearts':
          particle = {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: Math.random() * 15 + 10,
            weight: Math.random() * 1 + 1,
            directionX: Math.random() * 2 - 1
          };
          break;
          
        case 'snow':
          particle = {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: Math.random() * 3 + 2,
            weight: Math.random() * 1 + 0.1,
            directionX: Math.random() * 2 - 1
          };
          break;
          
        case 'leaves':
          particle = {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: Math.random() * 10 + 5,
            weight: Math.random() * 1 + 0.3,
            directionX: Math.random() * 5 - 2.5,
            rotation: Math.random() * 360
          };
          break;
      }
      
      this.data.particles.push(particle);
    }
    
    // Thiết lập trạng thái
    this.data.isActive = true;
    
    // Bắt đầu vẽ
    this.animate();
  },
  
  // Dừng hiệu ứng thời tiết
  stopWeather() {
    // Dừng animation
    if (this.data.animationFrame) {
      cancelAnimationFrame(this.data.animationFrame);
    }
    
    // Xóa canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Thiết lập trạng thái
    this.data.isActive = false;
  },
  
  // Cập nhật và vẽ các hạt
  animate() {
    // Xóa canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Cập nhật và vẽ từng hạt
    this.data.particles.forEach(p => {
      // Cập nhật vị trí hạt
      p.y += p.weight;
      p.x += p.directionX;
      
      // Xoay hạt (nếu là lá)
      if (this.data.currentWeather === 'leaves') {
        p.rotation += 0.5;
      }
      
      // Vẽ hạt dựa trên loại thời tiết
      this.ctx.fillStyle = this.data.currentWeather === 'hearts' ? '#ff6f91' : 
                          this.data.currentWeather === 'snow' ? '#ffffff' : 
                          '#a5673f';
      this.ctx.beginPath();
      
      switch (this.data.currentWeather) {
        case 'hearts':
          this.drawHeart(p.x, p.y, p.size);
          break;
          
        case 'snow':
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          break;
          
        case 'leaves':
          this.drawLeaf(p.x, p.y, p.size, p.rotation);
          break;
      }
      
      this.ctx.fill();
      
      // Kiểm tra nếu hạt ra khỏi màn hình
      if (p.y > this.canvas.height) {
        p.y = -10;
        p.x = Math.random() * this.canvas.width;
      }
      
      // Kiểm tra nếu hạt ra khỏi màn hình theo chiều ngang
      if (p.x > this.canvas.width || p.x < 0) {
        p.x = Math.random() * this.canvas.width;
      }
    });
    
    // Tiếp tục vẽ nếu vẫn đang hoạt động
    if (this.data.isActive) {
      this.data.animationFrame = requestAnimationFrame(() => this.animate());
    }
  },
  
  // Vẽ hình trái tim
  drawHeart(x, y, size) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.scale(size / 10, size / 10);
    
    this.ctx.moveTo(0, 0);
    this.ctx.bezierCurveTo(-5, -5, -10, 0, -5, 5);
    this.ctx.bezierCurveTo(0, 10, 5, 5, 0, 0);
    this.ctx.bezierCurveTo(-5, -5, 0, -10, 5, -5);
    this.ctx.bezierCurveTo(10, 0, 5, 5, 0, 0);
    
    this.ctx.restore();
  },
  
  // Vẽ hình lá
  drawLeaf(x, y, size, rotation) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation * Math.PI / 180);
    this.ctx.scale(size / 10, size / 10);
    
    this.ctx.moveTo(0, -5);
    this.ctx.bezierCurveTo(2, -5, 5, -3, 5, 0);
    this.ctx.bezierCurveTo(5, 5, 2, 8, 0, 10);
    this.ctx.bezierCurveTo(-2, 8, -5, 5, -5, 0);
    this.ctx.bezierCurveTo(-5, -3, -2, -5, 0, -5);
    
    this.ctx.restore();
  }
};

// ==============================================
// MODULE: FIREWORKS 3D
// ==============================================
const Fireworks3D = {
  // Dữ liệu của module
  data: {
    fireworks: [],
    particles: [],
    isActive: false,
    autoLaunch: true,
    lastLaunch: 0,
    launchInterval: 2000,
    canvas: null,
    ctx: null,
    animationFrame: null,
    hue: 120
  },
  
  // Khởi tạo module
  init() {
    // Thiết lập canvas
    this.setupCanvas();
    
    // Gắn sự kiện cho nút kích hoạt pháo hoa
    document.getElementById('trigger-fireworks').addEventListener('click', () => {
      if (this.data.isActive) {
        this.stop();
      } else {
        this.start();
      }
    });
  },
  
  // Thiết lập canvas
  setupCanvas() {
    // Lấy canvas từ DOM
    this.data.canvas = document.getElementById('fireworks-canvas');
    this.data.ctx = this.data.canvas.getContext('2d');
    
    // Thiết lập kích thước canvas
    this.resizeCanvas();
    
    // Gắn sự kiện thay đổi kích thước
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  },
  
  // Thay đổi kích thước canvas
  resizeCanvas() {
    // Thiết lập kích thước canvas bằng kích thước cửa sổ
    this.data.canvas.width = window.innerWidth;
    this.data.canvas.height = window.innerHeight;
  },
  
  // Bắt đầu hiệu ứng pháo hoa
  start() {
    // Hiển thị container
    document.getElementById('fireworks-container').style.display = 'block';
    
    // Thiết lập trạng thái
    this.data.isActive = true;
    this.data.autoLaunch = true;
    
    // Bắt đầu vẽ
    this.animate();
  },
  
  // Dừng hiệu ứng pháo hoa
  stop() {
    // Dừng animation
    if (this.data.animationFrame) {
      cancelAnimationFrame(this.data.animationFrame);
    }
    
    // Ẩn container
    document.getElementById('fireworks-container').style.display = 'none';
    
    // Thiết lập trạng thái
    this.data.isActive = false;
    this.data.fireworks = [];
    this.data.particles = [];
  },
  
  // Tạo pháo hoa mới
  createFirework(startX, startY, targetX, targetY) {
    // Tạo đối tượng pháo hoa
    this.data.fireworks.push({
      x: startX,
      y: startY,
      startX: startX,
      startY: startY,
      targetX: targetX,
      targetY: targetY,
      distanceToTarget: Math.sqrt(Math.pow(targetX - startX, 2) + Math.pow(targetY - startY, 2)),
      distanceTraveled: 0,
      coordinates: [],
      coordinateCount: 3,
      angle: Math.atan2(targetY - startY, targetX - startX),
      speed: 2,
      acceleration: 1.05,
      brightness: Math.random() * 50 + 50,
      hue: this.data.hue,
      alpha: 1
    });
    
    // Tăng giá trị màu sắc
    this.data.hue += 20;
    if (this.data.hue >= 360) {
      this.data.hue = 0;
    }
  },
  
  // Tạo các hạt khi pháo hoa nổ
  createParticles(x, y, hue) {
    // Số lượng hạt
    const particleCount = 30;
    
    // Tạo các hạt
    for (let i = 0; i < particleCount; i++) {
      // Tạo đối tượng hạt
      this.data.particles.push({
        x: x,
        y: y,
        coordinates: [],
        coordinateCount: 5,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 10 + 1,
        friction: 0.95,
        gravity: 1,
        hue: hue,
        brightness: Math.random() * 50 + 50,
        alpha: 1,
        decay: Math.random() * 0.03 + 0.02
      });
    }
  },
  
  // Cập nhật và vẽ
  animate() {
    // Tiếp tục vẽ nếu vẫn đang hoạt động
    if (this.data.isActive) {
      this.data.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    // Thiết lập chế độ đè màu
    this.data.ctx.globalCompositeOperation = 'destination-out';
    
    // Xóa canvas (với độ trong suốt)
    this.data.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.data.ctx.fillRect(0, 0, this.data.canvas.width, this.data.canvas.height);
    
    // Thiết lập chế độ đè màu bình thường
    this.data.ctx.globalCompositeOperation = 'lighter';
    
    // Cập nhật và vẽ các pháo hoa
    this.updateFireworks();
    
    // Cập nhật và vẽ các hạt
    this.updateParticles();
    
    // Tự động phóng pháo hoa
    if (this.data.autoLaunch && Date.now() - this.data.lastLaunch > this.data.launchInterval) {
      // Phóng pháo hoa mới
      const startX = this.data.canvas.width / 2;
      const startY = this.data.canvas.height;
      const targetX = Math.random() * this.data.canvas.width;
      const targetY = Math.random() * this.data.canvas.height / 2;
      
      this.createFirework(startX, startY, targetX, targetY);
      
      // Cập nhật thời gian phóng
      this.data.lastLaunch = Date.now();
      
      // Thay đổi khoảng thời gian phóng
      this.data.launchInterval = Math.random() * 1000 + 1000;
    }
  },
  
  // Cập nhật và vẽ các pháo hoa
  updateFireworks() {
    // Lặp qua tất cả các pháo hoa
    for (let i = this.data.fireworks.length - 1; i >= 0; i--) {
      const firework = this.data.fireworks[i];
      
      // Cập nhật tọa độ
      const vx = Math.cos(firework.angle) * firework.speed;
      const vy = Math.sin(firework.angle) * firework.speed;
      
      firework.speed *= firework.acceleration;
      firework.distanceTraveled = Math.sqrt(Math.pow(firework.x - firework.startX, 2) + Math.pow(firework.y - firework.startY, 2));
      
      firework.x += vx;
      firework.y += vy;
      
      // Kiểm tra nếu pháo hoa đã đến đích
      if (firework.distanceTraveled >= firework.distanceToTarget) {
        // Tạo các hạt khi pháo hoa nổ
        this.createParticles(firework.targetX, firework.targetY, firework.hue);
        
        // Xóa pháo hoa
        this.data.fireworks.splice(i, 1);
      } else {
        // Vẽ pháo hoa
        this.data.ctx.beginPath();
        this.data.ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
        this.data.ctx.fillStyle = `hsla(${firework.hue}, 100%, ${firework.brightness}%, ${firework.alpha})`;
        this.data.ctx.fill();
      }
    }
  },
  
  // Cập nhật và vẽ các hạt
  updateParticles() {
    // Lặp qua tất cả các hạt
    for (let i = this.data.particles.length - 1; i >= 0; i--) {
      const particle = this.data.particles[i];
      
      // Cập nhật tọa độ
      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed + particle.gravity;
      
      // Áp dụng ma sát
      particle.speed *= particle.friction;
      
      // Giảm độ trong suốt
      particle.alpha -= particle.decay;
      
      // Kiểm tra nếu hạt đã biến mất
      if (particle.alpha <= 0) {
        this.data.particles.splice(i, 1);
      } else {
        // Vẽ hạt
        this.data.ctx.beginPath();
        this.data.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        this.data.ctx.fillStyle = `hsla(${particle.hue}, 100%, ${particle.brightness}%, ${particle.alpha})`;
        this.data.ctx.fill();
      }
    }
  }
};

// ==============================================
// MODULE: EXTRA CONTROLS
// ==============================================
const ExtraControls = {
  // Khởi tạo module
  init() {
    // Mặc định ẩn các điều khiển bổ sung
    App.elements.extraControls.style.display = 'none';
  }
};

// ==============================================
// KHỞI CHẠY ỨNG DỤNG
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
  // Khởi tạo ứng dụng
  App.init();
});
// Khởi tạo biến lịch sử
App.state.history = [];

// Thêm chức năng điều hướng
function initNavigation() {
  // Gắn sự kiện cho nút Trang chủ
  document.getElementById('nav-home').addEventListener('click', () => {
    navigateTo('section-home');
  });
  
  // Gắn sự kiện cho nút Trắc nghiệm
  document.getElementById('nav-quiz').addEventListener('click', () => {
    navigateTo('section-quiz');
    QuizSection.showQuestion();
  });
  
  // Gắn sự kiện cho nút Trò chơi trí nhớ
  document.getElementById('nav-memory').addEventListener('click', () => {
    navigateTo('section-memory');
    MemoryGame.createCards();
  });
  
  // Gắn sự kiện cho nút Ghép hình
  document.getElementById('nav-puzzle').addEventListener('click', () => {
    navigateTo('section-puzzle');
    PuzzleGame.createPuzzlePieces();
    PuzzleGame.startTimer();
  });
  
  // Gắn sự kiện cho nút Phòng trưng bày
  document.getElementById('nav-gallery').addEventListener('click', () => {
    Gallery3D.show();
  });
  
  // Gắn sự kiện cho nút Thiệp chúc mừng
  document.getElementById('nav-cards').addEventListener('click', () => {
    PasswordScreen.show();
  });
  
  // Gắn sự kiện cho nút Quay lại
  document.getElementById('back-button').addEventListener('click', () => {
    goBack();
  });
  
  // Gắn sự kiện cho nút Bắt đầu hành trình
  document.getElementById('start-journey').addEventListener('click', () => {
    navigateTo('section-video');
  });
}

// Hàm điều hướng đến section theo ID
function navigateTo(sectionId) {
  // Lưu section hiện tại vào lịch sử
  if (App.state.currentSection >= 0) {
    const currentSectionElement = App.elements.sections[App.state.currentSection];
    if (currentSectionElement) {
      App.state.history.push(currentSectionElement.id);
    }
  }
  
  // Tìm index của section mới
  const newIndex = Array.from(App.elements.sections).findIndex(section => section.id === sectionId);
  
  if (newIndex >= 0) {
    // Hiển thị section mới
    App.showSection(newIndex);
    
    // Cập nhật trạng thái active cho menu
    updateNavigation(sectionId);
  }
}

// Hàm quay lại section trước đó
function goBack() {
  if (App.state.history.length > 0) {
    // Lấy section trước đó từ lịch sử
    const previousSectionId = App.state.history.pop();
    
    // Tìm index của section trước đó
    const prevIndex = Array.from(App.elements.sections).findIndex(section => section.id === previousSectionId);
    
    if (prevIndex >= 0) {
      // Hiển thị section trước đó
      App.showSection(prevIndex);
      
      // Cập nhật trạng thái active cho menu
      updateNavigation(previousSectionId);
    }
  } else {
    // Nếu không có lịch sử, quay về trang chủ
    navigateTo('section-home');
  }
}

// Cập nhật trạng thái active cho menu
function updateNavigation(activeSectionId) {
  // Xóa active khỏi tất cả các mục
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Thêm active vào mục tương ứng
  let activeNavId = '';
  
  switch(activeSectionId) {
    case 'section-home':
      activeNavId = 'nav-home';
      break;
    case 'section-quiz':
      activeNavId = 'nav-quiz';
      break;
    case 'section-memory':
      activeNavId = 'nav-memory';
      break;
    case 'section-puzzle':
      activeNavId = 'nav-puzzle';
      break;
    case 'section-gallery':
      activeNavId = 'nav-gallery';
      break;
    default:
      break;
  }
  
  if (activeNavId) {
    document.getElementById(activeNavId).classList.add('active');
  }
}

// Gọi hàm khởi tạo điều hướng
document.addEventListener('DOMContentLoaded', function() {
  // Khởi tạo điều hướng
  initNavigation();
  
  // Khởi tạo ứng dụng
  App.init();
});