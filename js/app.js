// DOM要素を取得
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResultsSection = document.getElementById('searchResultsSection');
const searchResults = document.getElementById('searchResults');
const popularMovies = document.getElementById('popularMovies');
const topRatedMovies = document.getElementById('topRatedMovies');
const upcomingMovies = document.getElementById('upcomingMovies');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');
const searchHistorySection = document.getElementById('searchHistorySection');
const historyTags = document.getElementById('historyTags');

// ヒーローセクション要素
const hero = document.getElementById('hero');
const heroTitle = document.getElementById('heroTitle');
const heroOverview = document.getElementById('heroOverview');
const heroRating = document.getElementById('heroRating');
const heroReleaseDate = document.getElementById('heroReleaseDate');
const heroDetailsBtn = document.getElementById('heroDetailsBtn');

// 現在のヒーロー映画データ
let currentHeroMovie = null;

// アプリケーション初期化
async function init() {
    try {
        // 映画データを読み込み
        await loadPopularMovies();
        await loadTopRatedMovies();
        await loadUpcomingMovies();

        // ヒーローバナーを設定
        await setupHeroBanner();

        // 検索履歴を表示
        displaySearchHistory();

        // イベントリスナーを設定
        setupEventListeners();

        // ヘッダースクロール効果
        setupHeaderScroll();
    } catch (error) {
        console.error('初期化エラー:', error);
        alert('アプリケーションの初期化に失敗しました。APIキーを確認してください。');
    }
}

// イベントリスナー設定
function setupEventListeners() {
    // 検索ボタン
    searchBtn.addEventListener('click', handleSearch);

    // Enterキーで検索
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // モーダルを閉じる
    closeBtn.addEventListener('click', closeModal);

    // モーダル外をクリックで閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ヒーロー詳細ボタン
    heroDetailsBtn.addEventListener('click', () => {
        if (currentHeroMovie) {
            openModal(currentHeroMovie);
        }
    });
}

// ヘッダースクロール効果
function setupHeaderScroll() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ヒーローバナー設定
async function setupHeroBanner() {
    try {
        const data = await movieAPI.getPopularMovies();
        if (data.results && data.results.length > 0) {
            // ランダムに映画を選択
            const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length));
            const movie = data.results[randomIndex];
            currentHeroMovie = movie;

            // ヒーローバナーを更新
            hero.style.backgroundImage = `url(${movieAPI.getBackdropUrl(movie.backdrop_path)})`;
            heroTitle.textContent = movie.title;
            heroOverview.textContent = movie.overview || '概要がありません';
            heroRating.textContent = `⭐ ${movie.vote_average.toFixed(1)}`;
            heroReleaseDate.textContent = movie.release_date || '未定';
        }
    } catch (error) {
        console.error('ヒーローバナーの設定エラー:', error);
    }
}

// 人気映画を読み込み
async function loadPopularMovies() {
    try {
        const data = await movieAPI.getPopularMovies();
        displayMovies(data.results, popularMovies);
    } catch (error) {
        console.error('人気映画の読み込みエラー:', error);
    }
}

// 高評価映画を読み込み
async function loadTopRatedMovies() {
    try {
        const data = await movieAPI.getTopRatedMovies();
        displayMovies(data.results, topRatedMovies);
    } catch (error) {
        console.error('高評価映画の読み込みエラー:', error);
    }
}

// 公開予定映画を読み込み
async function loadUpcomingMovies() {
    try {
        const data = await movieAPI.getUpcomingMovies();
        displayMovies(data.results, upcomingMovies);
    } catch (error) {
        console.error('公開予定映画の読み込みエラー:', error);
    }
}

// 検索処理
async function handleSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        alert('検索キーワードを入力してください');
        return;
    }

    try {
        // 検索履歴に追加
        searchHistory.addToHistory(query);
        displaySearchHistory();

        // 検索実行
        const data = await movieAPI.searchMovies(query);

        if (data.results && data.results.length > 0) {
            displayMovies(data.results, searchResults);
            searchResultsSection.style.display = 'block';

            // 検索結果にスムーズにスクロール
            searchResultsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            searchResults.innerHTML = '<p style="color: #999;">検索結果が見つかりませんでした。</p>';
            searchResultsSection.style.display = 'block';
        }
    } catch (error) {
        console.error('検索エラー:', error);
        alert('検索中にエラーが発生しました');
    }
}

// 映画カードを表示
function displayMovies(movies, container) {
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        container.appendChild(movieCard);
    });
}

// 映画カードを作成
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const poster = document.createElement('img');
    poster.className = 'movie-poster';
    poster.src = movieAPI.getImageUrl(movie.poster_path);
    poster.alt = movie.title;
    poster.loading = 'lazy';

    const info = document.createElement('div');
    info.className = 'movie-info';

    const title = document.createElement('div');
    title.className = 'movie-title';
    title.textContent = movie.title;

    const rating = document.createElement('div');
    rating.className = 'movie-rating';
    rating.textContent = `⭐ ${movie.vote_average.toFixed(1)}`;

    info.appendChild(title);
    info.appendChild(rating);

    card.appendChild(poster);
    card.appendChild(info);

    // クリックでモーダル表示
    card.addEventListener('click', () => openModal(movie));

    return card;
}

// モーダルを開く
function openModal(movie) {
    const modalTitle = document.getElementById('modalTitle');
    const modalOverview = document.getElementById('modalOverview');
    const modalRating = document.getElementById('modalRating');
    const modalReleaseDate = document.getElementById('modalReleaseDate');
    const modalBackdrop = document.getElementById('modalBackdrop');

    modalTitle.textContent = movie.title;
    modalOverview.textContent = movie.overview || '概要がありません';
    modalRating.textContent = `⭐ ${movie.vote_average.toFixed(1)}`;
    modalReleaseDate.textContent = movie.release_date || '未定';
    modalBackdrop.src = movieAPI.getBackdropUrl(movie.backdrop_path);
    modalBackdrop.alt = movie.title;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// モーダルを閉じる
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 検索履歴を表示
function displaySearchHistory() {
    const history = searchHistory.getHistory();

    if (history.length === 0) {
        searchHistorySection.style.display = 'none';
        return;
    }

    searchHistorySection.style.display = 'block';
    historyTags.innerHTML = '';

    history.forEach(term => {
        const tag = document.createElement('span');
        tag.className = 'history-tag';

        const text = document.createElement('span');
        text.textContent = term;

        // テキスト部分クリックで再検索
        text.addEventListener('click', () => {
            searchInput.value = term;
            handleSearch();
        });

        // 削除ボタン
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'history-tag-delete';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.setAttribute('aria-label', '削除');

        // 削除ボタンクリックで履歴から削除
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            searchHistory.removeFromHistory(term);
            displaySearchHistory();
        });

        tag.appendChild(text);
        tag.appendChild(deleteBtn);
        historyTags.appendChild(tag);
    });
}

// アプリケーション起動
init();
