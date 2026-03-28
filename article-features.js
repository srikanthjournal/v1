(() => {
  const fallbackData = {
    articles: [
      {
        id: 'deep-learning-2025-0201',
        title: 'Deep Learning Approaches for Medical Image Classification: A Comprehensive Survey',
        authors: 'A. Jain, Lorenzo, Marcel Chen, David Wilson',
        abstract: 'Survey of deep learning techniques applied to medical image diagnostics, covering CNNs, transfer learning, and benchmark datasets.',
        doi: '10.1234/ijkl.2025.0201',
        pages: '1-18',
        volume: 3,
        issue: 2,
        year: 2025,
        status: 'published',
        slug: 'Article-DeepLearning.html',
        pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        id: 'smart-cities-2025-0202',
        title: 'Sustainable Energy Solutions for Smart Cities: An IoT-based Framework',
        authors: 'B. Kumar, Rodriguez, Santos, Elly Park',
        abstract: 'IoT architecture for energy optimization and carbon reduction in urban environments.',
        doi: '10.1234/ijkl.2025.0202',
        pages: '19-32',
        volume: 3,
        issue: 2,
        year: 2025,
        status: 'published',
        slug: 'Article-SmartCities.html',
        pdf: 'https://www.africau.edu/images/default/sample.pdf'
      },
      {
        id: 'nlp-social-2025-0203',
        title: 'Natural Language Processing for Sentiment Analysis in Social Media',
        authors: 'K. Robert M., Lisa Zhang',
        abstract: 'Transformer-based sentiment analysis model with improved F1-score on benchmark social datasets.',
        doi: '10.1234/ijkl.2025.0203',
        pages: '33-48',
        volume: 3,
        issue: 2,
        year: 2025,
        status: 'published',
        slug: 'Article-NLP.html',
        pdf: 'https://gahp.net/wp-content/uploads/2017/09/sample.pdf'
      }
    ]
  };

  const state = {
    data: fallbackData,
  };

  const loadData = async () => {
    try {
      const res = await fetch('data/articles.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('articles.json not found');
      state.data = await res.json();
    } catch {
      state.data = fallbackData;
    }
  };

  const articleCard = (a, i) => `
    <article>
      <div class="num">${i + 1}</div>
      <div>
        <h5>${a.title}</h5>
        <p class="authors">${a.authors}</p>
        <p class="excerpt">${a.abstract}</p>
        <div class="meta">
          <span>DOI: ${a.doi}</span>
          <span>Pages: ${a.pages}</span>
          <span><a href="${a.slug}">View Article</a></span>
        </div>
      </div>
    </article>
  `;

  const setupCurrentIssue = () => {
    const holder = document.querySelector('[data-current-issue-list]');
    if (!holder) return;

    const vol = Number(holder.dataset.volume || 3);
    const issue = Number(holder.dataset.issue || 2);
    const baseItems = (state.data.articles || []).filter((a) => a.volume === vol && a.issue === issue);

    const render = (items) => {
      holder.innerHTML = items.map((a, i) => articleCard(a, i)).join('');
    };

    render(baseItems);

    const search = document.querySelector('[data-article-search]');
    if (!search) return;

    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      if (!q) return render(baseItems);
      const filtered = baseItems.filter((a) => {
        return [a.title, a.authors, a.doi].join(' ').toLowerCase().includes(q);
      });
      render(filtered);
    });
  };

  const setupIssueView = () => {
    const holder = document.querySelector('[data-issue-view-list]');
    if (!holder) return;

    const vol = Number(holder.dataset.volume || 3);
    const issue = Number(holder.dataset.issue || 2);
    const baseItems = (state.data.articles || []).filter((a) => a.volume === vol && a.issue === issue);
    holder.innerHTML = baseItems.slice(0, 2).map((a, i) => articleCard(a, i)).join('');
  };

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const setupCitationTools = () => {
    document.querySelectorAll('[data-citation-tools]').forEach((wrap) => {
      const doi = wrap.dataset.doi || '';
      const title = wrap.dataset.title || '';
      const authors = wrap.dataset.authors || '';
      const year = wrap.dataset.year || '2025';
      const citationApa = `${authors} (${year}). ${title}. IJSRI. https://doi.org/${doi}`;

      const copy = (txt) => navigator.clipboard?.writeText(txt).catch(() => {});

      wrap.querySelector('[data-action="copy-doi"]')?.addEventListener('click', () => copy(doi));
      wrap.querySelector('[data-action="copy-apa"]')?.addEventListener('click', () => copy(citationApa));

      wrap.querySelector('[data-action="download-bibtex"]')?.addEventListener('click', () => {
        const bib = `@article{${doi.replace(/[^a-zA-Z0-9]/g, '')},\n  title={${title}},\n  author={${authors}},\n  journal={IJSRI},\n  year={${year}},\n  doi={${doi}}\n}`;
        downloadFile('citation.bib', bib);
      });

      wrap.querySelector('[data-action="download-ris"]')?.addEventListener('click', () => {
        const ris = `TY  - JOUR\nTI  - ${title}\nAU  - ${authors}\nPY  - ${year}\nJO  - IJSRI\nDO  - ${doi}\nER  -`;
        downloadFile('citation.ris', ris);
      });
    });
  };

  const run = async () => {
    await loadData();
    setupCurrentIssue();
    setupIssueView();
    setupCitationTools();
  };

  run();
})();

