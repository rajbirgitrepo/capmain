var plotly_data = {
  data: [
    {
      hovertemplate:
        "<b>%{hovertext}</b><br><br>USER ENGAGEMENT=%{x}<br>FAMILY ENGAGEMENT=%{y}<br>OVERALL PLAYBACK=%{marker.size}<br>SCHOOL COUNT=%{marker.color}<extra></extra>",
      hovertext: [
        "WICHITA",
        "KRUM",
        "LAUSD",
        "WESTFIELD",
        "YOUNGSTOWN",
        "FAIRFIELD",
        "CLARKSVILLE",
        "ENGLEWOOD",
        "PINELLAS",
        "CHICO",
        "BROWARD",
        "SAN LEANARDO",
        "RUSD",
        "OROVILLE",
        "AGAWAM",
        "HILLSBOROUGH",
        "SARASOTA",
        "FLINT",
        "LA JOYA",
        "Community Consolidated School District 89",
        "BELLEVILLE",
        "WAYNE METRO",
        "OGDEN",
        "SALT LAKE",
        "DOUGLAS",
        "NYC - Queens South",
        "Early learning Sarasota",
        "PUSD",
      ],
      legendgroup: "",
      marker: {
        color: [
          4,
          2,
          264,
          17,
          20,
          42,
          43,
          8,
          27,
          19,
          235,
          8,
          34,
          7,
          6,
          239,
          56,
          23,
          44,
          5,
          8,
          21,
          20,
          18,
          8,
          257,
          18,
          12,
        ],
        coloraxis: "coloraxis",
        size: [
          3490,
          1108,
          13760,
          6848,
          5406,
          33137,
          26509,
          8147,
          4584,
          8118,
          9619,
          1501,
          60068,
          2347,
          3651,
          3321,
          50571,
          2138,
          2093,
          224,
          2390,
          289,
          5120,
          2670,
          89,
          1651,
          181,
          555,
        ],
        sizemode: "area",
        sizeref: 16.685555555555556,
        symbol: "circle",
      },
      mode: "markers",
      name: "",
      orientation: "v",
      showlegend: false,
      type: "scatter",
      x: [
        69,
        76,
        5,
        19,
        20,
        16,
        13,
        9,
        10,
        11,
        8,
        8,
        38,
        28,
        23,
        3,
        10,
        1,
        33,
        2,
        75,
        44,
        17,
        15,
        5,
        4,
        56,
        5,
      ],
      xaxis: "x",
      y: [
        50,
        12,
        16,
        8,
        7,
        3,
        21,
        0,
        15,
        14,
        7,
        0,
        2,
        6,
        29,
        5,
        2,
        0,
        33,
        0,
        0,
        0,
        50,
        23,
        0,
        5,
        0,
        14,
      ],
      yaxis: "y",
    },
  ],
  layout: {
    coloraxis: {
      colorbar: { title: { text: "SCHOOL COUNT" } },
      colorscale: [
        [0.0, "#0d0887"],
        [0.1111111111111111, "#46039f"],
        [0.2222222222222222, "#7201a8"],
        [0.3333333333333333, "#9c179e"],
        [0.4444444444444444, "#bd3786"],
        [0.5555555555555556, "#d8576b"],
        [0.6666666666666666, "#ed7953"],
        [0.7777777777777778, "#fb9f3a"],
        [0.8888888888888888, "#fdca26"],
        [1.0, "#f0f921"],
      ],
    },
    legend: { itemsizing: "constant", tracegroupgap: 0 },
    template: {
      data: {
        bar: [
          {
            error_x: { color: "#2a3f5f" },
            error_y: { color: "#2a3f5f" },
            marker: { line: { color: "#E5ECF6", width: 0.5 } },
            type: "bar",
          },
        ],
        barpolar: [
          {
            marker: { line: { color: "#E5ECF6", width: 0.5 } },
            type: "barpolar",
          },
        ],
        carpet: [
          {
            aaxis: {
              endlinecolor: "#2a3f5f",
              gridcolor: "white",
              linecolor: "white",
              minorgridcolor: "white",
              startlinecolor: "#2a3f5f",
            },
            baxis: {
              endlinecolor: "#2a3f5f",
              gridcolor: "white",
              linecolor: "white",
              minorgridcolor: "white",
              startlinecolor: "#2a3f5f",
            },
            type: "carpet",
          },
        ],
        choropleth: [
          { colorbar: { outlinewidth: 0, ticks: "" }, type: "choropleth" },
        ],
        contour: [
          {
            colorbar: { outlinewidth: 0, ticks: "" },
            colorscale: [
              [0.0, "#0d0887"],
              [0.1111111111111111, "#46039f"],
              [0.2222222222222222, "#7201a8"],
              [0.3333333333333333, "#9c179e"],
              [0.4444444444444444, "#bd3786"],
              [0.5555555555555556, "#d8576b"],
              [0.6666666666666666, "#ed7953"],
              [0.7777777777777778, "#fb9f3a"],
              [0.8888888888888888, "#fdca26"],
              [1.0, "#f0f921"],
            ],
            type: "contour",
          },
        ],
        contourcarpet: [
          { colorbar: { outlinewidth: 0, ticks: "" }, type: "contourcarpet" },
        ],
        heatmap: [
          {
            colorbar: { outlinewidth: 0, ticks: "" },
            colorscale: [
              [0.0, "#0d0887"],
              [0.1111111111111111, "#46039f"],
              [0.2222222222222222, "#7201a8"],
              [0.3333333333333333, "#9c179e"],
              [0.4444444444444444, "#bd3786"],
              [0.5555555555555556, "#d8576b"],
              [0.6666666666666666, "#ed7953"],
              [0.7777777777777778, "#fb9f3a"],
              [0.8888888888888888, "#fdca26"],
              [1.0, "#f0f921"],
            ],
            type: "heatmap",
          },
        ],
        heatmapgl: [
          {
            colorbar: { outlinewidth: 0, ticks: "" },
            colorscale: [
              [0.0, "#0d0887"],
              [0.1111111111111111, "#46039f"],
              [0.2222222222222222, "#7201a8"],
              [0.3333333333333333, "#9c179e"],
              [0.4444444444444444, "#bd3786"],
              [0.5555555555555556, "#d8576b"],
              [0.6666666666666666, "#ed7953"],
              [0.7777777777777778, "#fb9f3a"],
              [0.8888888888888888, "#fdca26"],
              [1.0, "#f0f921"],
            ],
            type: "heatmapgl",
          },
        ],
        histogram: [
          {
            marker: { colorbar: { outlinewidth: 0, ticks: "" } },
            type: "histogram",
          },
        ],
        histogram2d: [
          {
            colorbar: { outlinewidth: 0, ticks: "" },
            colorscale: [
              [0.0, "#0d0887"],
              [0.1111111111111111, "#46039f"],
              [0.2222222222222222, "#7201a8"],
              [0.3333333333333333, "#9c179e"],
              [0.4444444444444444, "#bd3786"],
              [0.5555555555555556, "#d8576b"],
              [0.6666666666666666, "#ed7953"],
              [0.7777777777777778, "#fb9f3a"],
              [0.8888888888888888, "#fdca26"],
              [1.0, "#f0f921"],
            ],
            type: "histogram2d",
          },
        ],
        histogram2dcontour: [
          {
            colorbar: { outlinewidth: 0, ticks: "" },
            colorscale: [
              [0.0, "#0d0887"],
              [0.1111111111111111, "#46039f"],
              [0.2222222222222222, "#7201a8"],
              [0.3333333333333333, "#9c179e"],
              [0.4444444444444444, "#bd3786"],
              [0.5555555555555556, "#d8576b"],
              [0.6666666666666666, "#ed7953"],
              [0.7777777777777778, "#fb9f3a"],
              [0.8888888888888888, "#fdca26"],
              [1.0, "#f0f921"],
            ],
            type: "histogram2dcontour",
          },
        ],
        mesh3d: [{ colorbar: { outlinewidth: 0, ticks: "" }, type: "mesh3d" }],
        parcoords: [
          {
            line: { colorbar: { outlinewidth: 0, ticks: "" } },
            type: "parcoords",
          },
        ],
        pie: [{ automargin: true, type: "pie" }],
        scatter: [
          {
            marker: { colorbar: { outlinewidth: 0, ticks: "" } },
            type: "scatter",
          },
        ],
        scatter3d: [
          {
            line: { colorbar: { outlinewidth: 0, ticks: "" } },
            marker: { colorbar: { outlinewidth: 0, ticks: "" } },
            type: "scatter3d",
          },
        ],
        scattercarpet: [
          {
            marker: { colorbar: { outlinewidth: 0, ticks: "" } },
            type: "scattercarpet",
          },
        ],
        scattergeo: [
          {
            marker: { colorbar: { outlinewidth: 0, ticks: "" } },
            type: "scattergeo",
          },
        ],
        scattergl: [
          {
            marker: { colorbar: { outlinewidth: 0, ticks: "" } },
            type: "scattergl",
          },
        ],
        scattermapbox: [
          {
            marker: { colorbar: { outlinewidth: 0, ticks: "" } },
            type: "scattermapbox",
          },
        ],
        scatterpolar: [
          {
            marker: { colorbar: { outlinewidth: 0, ticks: "" } },
            type: "scatterpolar",
          },
        ],
        scatterpolargl: [
          {
            marker: { colorbar: { outlinewidth: 0, ticks: "" } },
            type: "scatterpolargl",
          },
        ],
        scatterternary: [
          {
            marker: { colorbar: { outlinewidth: 0, ticks: "" } },
            type: "scatterternary",
          },
        ],
        surface: [
          {
            colorbar: { outlinewidth: 0, ticks: "" },
            colorscale: [
              [0.0, "#0d0887"],
              [0.1111111111111111, "#46039f"],
              [0.2222222222222222, "#7201a8"],
              [0.3333333333333333, "#9c179e"],
              [0.4444444444444444, "#bd3786"],
              [0.5555555555555556, "#d8576b"],
              [0.6666666666666666, "#ed7953"],
              [0.7777777777777778, "#fb9f3a"],
              [0.8888888888888888, "#fdca26"],
              [1.0, "#f0f921"],
            ],
            type: "surface",
          },
        ],
        table: [
          {
            cells: { fill: { color: "#EBF0F8" }, line: { color: "white" } },
            header: { fill: { color: "#C8D4E3" }, line: { color: "white" } },
            type: "table",
          },
        ],
      },
      layout: {
        annotationdefaults: {
          arrowcolor: "#2a3f5f",
          arrowhead: 0,
          arrowwidth: 1,
        },
        coloraxis: { colorbar: { outlinewidth: 0, ticks: "" } },
        colorscale: {
          diverging: [
            [0, "#8e0152"],
            [0.1, "#c51b7d"],
            [0.2, "#de77ae"],
            [0.3, "#f1b6da"],
            [0.4, "#fde0ef"],
            [0.5, "#f7f7f7"],
            [0.6, "#e6f5d0"],
            [0.7, "#b8e186"],
            [0.8, "#7fbc41"],
            [0.9, "#4d9221"],
            [1, "#276419"],
          ],
          sequential: [
            [0.0, "#0d0887"],
            [0.1111111111111111, "#46039f"],
            [0.2222222222222222, "#7201a8"],
            [0.3333333333333333, "#9c179e"],
            [0.4444444444444444, "#bd3786"],
            [0.5555555555555556, "#d8576b"],
            [0.6666666666666666, "#ed7953"],
            [0.7777777777777778, "#fb9f3a"],
            [0.8888888888888888, "#fdca26"],
            [1.0, "#f0f921"],
          ],
          sequentialminus: [
            [0.0, "#0d0887"],
            [0.1111111111111111, "#46039f"],
            [0.2222222222222222, "#7201a8"],
            [0.3333333333333333, "#9c179e"],
            [0.4444444444444444, "#bd3786"],
            [0.5555555555555556, "#d8576b"],
            [0.6666666666666666, "#ed7953"],
            [0.7777777777777778, "#fb9f3a"],
            [0.8888888888888888, "#fdca26"],
            [1.0, "#f0f921"],
          ],
        },
        colorway: [
          "#636efa",
          "#EF553B",
          "#00cc96",
          "#ab63fa",
          "#FFA15A",
          "#19d3f3",
          "#FF6692",
          "#B6E880",
          "#FF97FF",
          "#FECB52",
        ],
        font: { color: "#2a3f5f" },
        geo: {
          bgcolor: "white",
          lakecolor: "white",
          landcolor: "#E5ECF6",
          showlakes: true,
          showland: true,
          subunitcolor: "white",
        },
        hoverlabel: { align: "left" },
        hovermode: "closest",
        mapbox: { style: "light" },
        paper_bgcolor: "white",
        plot_bgcolor: "#E5ECF6",
        polar: {
          angularaxis: { gridcolor: "white", linecolor: "white", ticks: "" },
          bgcolor: "#E5ECF6",
          radialaxis: { gridcolor: "white", linecolor: "white", ticks: "" },
        },
        scene: {
          xaxis: {
            backgroundcolor: "#E5ECF6",
            gridcolor: "white",
            gridwidth: 2,
            linecolor: "white",
            showbackground: true,
            ticks: "",
            zerolinecolor: "white",
          },
          yaxis: {
            backgroundcolor: "#E5ECF6",
            gridcolor: "white",
            gridwidth: 2,
            linecolor: "white",
            showbackground: true,
            ticks: "",
            zerolinecolor: "white",
          },
          zaxis: {
            backgroundcolor: "#E5ECF6",
            gridcolor: "white",
            gridwidth: 2,
            linecolor: "white",
            showbackground: true,
            ticks: "",
            zerolinecolor: "white",
          },
        },
        shapedefaults: { line: { color: "#2a3f5f" } },
        ternary: {
          aaxis: { gridcolor: "white", linecolor: "white", ticks: "" },
          baxis: { gridcolor: "white", linecolor: "white", ticks: "" },
          bgcolor: "#E5ECF6",
          caxis: { gridcolor: "white", linecolor: "white", ticks: "" },
        },
        title: { x: 0.05 },
        xaxis: {
          automargin: true,
          gridcolor: "white",
          linecolor: "white",
          ticks: "",
          title: { standoff: 15 },
          zerolinecolor: "white",
          zerolinewidth: 2,
        },
        yaxis: {
          automargin: true,
          gridcolor: "white",
          linecolor: "white",
          ticks: "",
          title: { standoff: 15 },
          zerolinecolor: "white",
          zerolinewidth: 2,
        },
      },
    },
    title: {
      text: "DATA IN CSY",
      x: 0.5,
      xanchor: "center",
      y: 0.9,
      yanchor: "top",
    },
    xaxis: {
      anchor: "y",
      domain: [0.0, 1.0],
      title: { text: "USER ENGAGEMENT" },
      type: "log",
    },
    yaxis: {
      anchor: "x",
      domain: [0.0, 1.0],
      title: { text: "FAMILY ENGAGEMENT" },
    },
  },
};
Plotly.react("divPlotly2", plotly_data.data, plotly_data.layout);
