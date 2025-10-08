// ローカルストレージ管理クラス
class SearchHistory {
    constructor() {
        this.storageKey = 'movieSearchHistory';
        this.maxHistoryItems = 10;
    }

    // 検索履歴を取得
    getHistory() {
        const history = localStorage.getItem(this.storageKey);
        return history ? JSON.parse(history) : [];
    }

    // 検索履歴に追加
    addToHistory(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') return;

        let history = this.getHistory();

        // 既存の同じ検索語を削除（重複を避ける）
        history = history.filter(item => item.toLowerCase() !== searchTerm.toLowerCase());

        // 新しい検索語を先頭に追加
        history.unshift(searchTerm);

        // 最大数を超えたら古いものを削除
        if (history.length > this.maxHistoryItems) {
            history = history.slice(0, this.maxHistoryItems);
        }

        // ローカルストレージに保存
        localStorage.setItem(this.storageKey, JSON.stringify(history));
    }

    // 検索履歴をクリア
    clearHistory() {
        localStorage.removeItem(this.storageKey);
    }

    // 特定の検索語を削除
    removeFromHistory(searchTerm) {
        let history = this.getHistory();
        history = history.filter(item => item !== searchTerm);
        localStorage.setItem(this.storageKey, JSON.stringify(history));
    }
}

// インスタンスを作成
const searchHistory = new SearchHistory();
