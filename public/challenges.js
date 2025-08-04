document.addEventListener('DOMContentLoaded', function () {
    // Load challenges from output.html
    fetch('/output.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('challenges-container').innerHTML = html;
            initializeChallengeFeatures();
        });

    function initializeChallengeFeatures() {
        // Solution toggle
        // ...existing code...
        document.querySelectorAll('.solution-toggle-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                // Find the closest challenge card and its solution-toggle div
                const card = btn.closest('.challenge-card');
                const solution = card.querySelector('.solution-toggle');

                const icon = btn.querySelector('i');
                if (solution.classList.contains('hidden')) {
                    solution.classList.remove('hidden');
                    solution.classList.add('active');
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                    btn.querySelector('span').textContent = 'Hide Solution';
                } else {
                    solution.classList.add('hidden');
                    solution.classList.remove('active');
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                    btn.querySelector('span').textContent = 'View Solution';
                }
            });
        });
        // ...existing code...

        // Mark as complete
        document.querySelectorAll('.mark-complete-btn').forEach(btn => {
            const challengeId = btn.dataset.id;
            if (localStorage.getItem(`challenge-complete-${challengeId}`) === 'true') {
                btn.classList.add('text-green-600', 'dark:text-green-400');
            } else {
                btn.classList.remove('text-green-600', 'dark:text-green-400');
            }
            btn.addEventListener('click', function () {
                localStorage.setItem(`challenge-complete-${challengeId}`, 'true');
                btn.classList.add('text-green-600', 'dark:text-green-400');
                updateOverallProgress();
            });
        });

        // Bookmark
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const challengeId = this.dataset.id;
                let bookmarks = JSON.parse(localStorage.getItem('bookmarked-challenges') || '[]');
                if (!bookmarks.includes(challengeId)) {
                    bookmarks.push(challengeId);
                    localStorage.setItem('bookmarked-challenges', JSON.stringify(bookmarks));
                    this.classList.add('bookmarked');
                } else {
                    bookmarks = bookmarks.filter(id => id !== challengeId);
                    localStorage.setItem('bookmarked-challenges', JSON.stringify(bookmarks));
                    this.classList.remove('bookmarked');
                }
            });
        });

        // View bookmarked
        document.getElementById('view-bookmarked').addEventListener('click', function () {
            let bookmarks = JSON.parse(localStorage.getItem('bookmarked-challenges') || '[]');
            document.querySelectorAll('.challenge-card').forEach(card => {
                if (bookmarks.includes(card.dataset.id)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Add this after DOMContentLoaded and after rendering challenges
        document.getElementById('title-search').addEventListener('input', function () {
            const searchValue = this.value.trim().toLowerCase();
            document.querySelectorAll('.challenge-card').forEach(card => {
                const title = card.querySelector('.challenge-title').textContent.toLowerCase();
                if (title.includes(searchValue) || searchValue === '') {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // ...existing code...
        // Replace the datalist input event with this for typed category search:
        document.getElementById('category-search').addEventListener('input', function () {
            const searchValue = this.value.trim().toLowerCase();
            document.querySelectorAll('.challenge-card').forEach(card => {
                // Each card may have multiple tags, so check all tags
                const tags = (card.dataset.category || '').toLowerCase();
                if (searchValue === '' || tags.includes(searchValue)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // ...existing code...
        document.getElementById('clear-category-search').addEventListener('click', function () {
            const input = document.getElementById('category-search');
            input.value = '';
            input.blur();
            document.querySelectorAll('.challenge-card').forEach(card => {
                card.style.display = '';
            });
        });
        // ...existing code...

        document.getElementById('difficulty-select').addEventListener('change', function () {
            const selected = this.value;
            document.querySelectorAll('.challenge-card').forEach(card => {
                if (selected === 'All' || card.querySelector('.difficulty-' + selected.toLowerCase())) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        updateOverallProgress();
    }

    // ...existing code...
    function updateOverallProgress() {
        const cards = document.querySelectorAll('.challenge-card');
        let completed = 0;
        cards.forEach(card => {
            const challengeId = card.dataset.id;
            if (localStorage.getItem(`challenge-complete-${challengeId}`) === 'true') {
                completed++;
                card.classList.add('completed');
            } else {
                card.classList.remove('completed');
            }
        });
        const percent = cards.length ? Math.round((completed / cards.length) * 100) : 0;
        // Update progress bar width
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = `${percent}%`;
        }
        // Update progress text
        const progressText = document.querySelector('.mt-2 span:first-child');
        const progressCount = document.querySelector('.mt-2 span:last-child');
        if (progressText) {
            progressText.textContent = `${percent}% completed`;
        }
        if (progressCount) {
            progressCount.textContent = `${completed}/${cards.length} challenges solved`;
        }
    }



});