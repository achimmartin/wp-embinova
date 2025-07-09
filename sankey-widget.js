class SankeyWidget extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.onload = () => this.drawChart();
    this.shadow.appendChild(script);
  }

  drawChart() {
    google.charts.load('current', { packages: ['sankey'] });
    google.charts.setOnLoadCallback(() => {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'From');
      data.addColumn('string', 'To');
      data.addColumn('number', 'Weight');

      data.addRows([
        ['A', 'X', 5],
        ['A', 'Y', 7],
        ['B', 'Y', 6],
        ['B', 'Z', 2],
        ['C', 'Z', 9]
      ]);

      const chart = new google.visualization.Sankey(this.shadow);
      chart.draw(data, {
        width: 600,
        height: 400,
        sankey: {
          link: { color: { fill: '#d799ae' } },
          node: { label: { fontSize: 14 } }
        }
      });
    });
  }
}

customElements.define('sankey-widget', SankeyWidget);
