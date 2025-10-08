
// APIクラス
class MovieAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    // 基本的なfetchリクエスト
    async fetchData(endpoint, params = {}) {
        const queryParams = new URLSearchParams({
            api_key: this.apiKey,
            language: 'ja-JP',
            ...params
        });

        try {
            const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // 人気映画を取得
    async getPopularMovies() {
        return await this.fetchData('/movie/popular');
    }

    // 高評価映画を取得
    async getTopRatedMovies() {
        return await this.fetchData('/movie/top_rated');
    }

    // 公開予定映画を取得
    async getUpcomingMovies() {
        return await this.fetchData('/movie/upcoming');
    }

    // 映画を検索
    async searchMovies(query) {
        return await this.fetchData('/search/movie', { query });
    }

    // 映画詳細を取得
    async getMovieDetails(movieId) {
        return await this.fetchData(`/movie/${movieId}`);
    }

    // 画像URLを生成
    getImageUrl(path, size = 'w500') {
        if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
        return `${IMAGE_BASE_URL}/${size}${path}`;
    }

    // 背景画像URLを生成
    getBackdropUrl(path, size = 'original') {
        if (!path) return 'https://via.placeholder.com/1920x1080?text=No+Image';
        return `${IMAGE_BASE_URL}/${size}${path}`;
    }
}

// APIインスタンスを作成
const movieAPI = new MovieAPI(API_KEY);
