(function () {
    let faqData = [];
    let activeCategory = 'all';

    function init() {
        fetch('faq-data.json')
            .then(function (res) { return res.json(); })
            .then(function (data) {
                faqData = data;
                renderFaqList(data);
                bindEvents();
            });
    }

    function renderFaqList(items) {
        const list = document.getElementById('faqList');
        const noResults = document.getElementById('noResults');
        const searchCount = document.getElementById('searchCount');
        const query = document.getElementById('searchInput').value.trim();

        if (items.length === 0) {
            list.innerHTML = '';
            noResults.style.display = 'block';
            searchCount.textContent = '';
            return;
        }

        noResults.style.display = 'none';
        if (query) {
            searchCount.textContent = '找到 ' + items.length + ' 个相关问题';
        } else {
            searchCount.textContent = '共 ' + items.length + ' 个问题';
        }

        list.innerHTML = items.map(function (item) {
            return '<div class="faq-item" data-category="' + item.category + '">' +
                '<div class="faq-header" onclick="toggleFaq(this)">' +
                '<span class="faq-category-badge ' + item.category + '">' + item.categoryName + '</span>' +
                '<span class="faq-question">' + highlight(item.question, query) + '</span>' +
                '<span class="faq-toggle">▼</span>' +
                '</div>' +
                '<div class="faq-body">' +
                '<div class="faq-section"><div class="faq-section-title">症状</div><div class="faq-section-content">' + highlight(item.symptoms, query) + '</div></div>' +
                '<div class="faq-section"><div class="faq-section-title">原因</div><div class="faq-section-content">' + highlight(item.cause, query) + '</div></div>' +
                '<div class="faq-section"><div class="faq-section-title">解决方案</div><div class="faq-section-content">' + highlight(item.solution, query) + '</div></div>' +
                '<div class="faq-id">' + item.id + '</div>' +
                '</div>' +
                '</div>';
        }).join('');
    }

    function highlight(text, query) {
        if (!query) return text;
        var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var regex = new RegExp('(' + escaped + ')', 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function filterAndSearch() {
        var query = document.getElementById('searchInput').value.trim().toLowerCase();
        var results = faqData.filter(function (item) {
            var categoryMatch = activeCategory === 'all' || item.category === activeCategory;
            if (!categoryMatch) return false;
            if (!query) return true;
            var searchText = (item.question + ' ' + item.symptoms + ' ' + item.cause + ' ' + item.solution).toLowerCase();
            var terms = query.split(/\s+/);
            return terms.every(function (term) {
                return searchText.indexOf(term) !== -1;
            });
        });
        renderFaqList(results);
    }

    function bindEvents() {
        var searchInput = document.getElementById('searchInput');
        var debounceTimer;
        searchInput.addEventListener('input', function () {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(filterAndSearch, 200);
        });

        var filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-category');
                filterAndSearch();
            });
        });
    }

    window.toggleFaq = function (header) {
        var item = header.parentElement;
        item.classList.toggle('open');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
