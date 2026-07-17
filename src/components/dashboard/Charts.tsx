import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PALETTE = ['#2563eb', '#0ea5e9', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#84cc16'];

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
};

export function BooksByCategoryChart({ data }: { data: { name: string; count: number }[] }) {
  const chartData = {
    labels: data.map((d) => d.name || 'Uncategorized'),
    datasets: [
      {
        label: 'Books',
        data: data.map((d) => d.count),
        backgroundColor: PALETTE[0],
        borderRadius: 6,
        maxBarThickness: 36,
      },
    ],
  };

  return (
    <div className="h-72">
      <Bar
        data={chartData}
        options={{
          ...baseOptions,
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, ticks: { precision: 0 } },
          },
        }}
      />
    </div>
  );
}

export function TopFavoritedBooksChart({ data }: { data: { title: string; count: number }[] }) {
  const chartData = {
    labels: data.map((d) => d.title),
    datasets: [
      {
        label: 'Favorites',
        data: data.map((d) => d.count),
        backgroundColor: data.map((_, i) => PALETTE[i % PALETTE.length]),
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="h-72">
      <Bar
        data={chartData}
        options={{
          ...baseOptions,
          indexAxis: 'y' as const,
          scales: {
            x: { beginAtZero: true, ticks: { precision: 0 } },
            y: { grid: { display: false } },
          },
        }}
      />
    </div>
  );
}

export function FavoritesTrendChart({ data }: { data: { _id: string; count: number }[] }) {
  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        label: 'Favorites',
        data: data.map((d) => d.count),
        borderColor: PALETTE[0],
        backgroundColor: 'rgba(37, 99, 235, 0.12)',
        fill: true,
        tension: 0.35,
        pointRadius: 2,
      },
    ],
  };

  return (
    <div className="h-72">
      <Line
        data={chartData}
        options={{
          ...baseOptions,
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, ticks: { precision: 0 } },
          },
        }}
      />
    </div>
  );
}

export function CategoryDistributionDonut({ data }: { data: { name: string; count: number }[] }) {
  const chartData = {
    labels: data.map((d) => d.name || 'Uncategorized'),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: data.map((_, i) => PALETTE[i % PALETTE.length]),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="h-72">
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'right' as const, labels: { boxWidth: 12, font: { size: 11 } } } },
        }}
      />
    </div>
  );
}
