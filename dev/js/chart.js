var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July'
        ],
        datasets: [
            {
                label: 'ChartJS',
                backgroundColor: 'rgba(0,0,0,.08)',
                borderColor: '#4e7d7c',
                data: [30, 25, 45, 85, 61, 15, 30]
            }
        ]
    },
    options: {
        elements: {
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            line: {
                tension: 0
            },
            point: {
                radius: 5,
                backgroundColor: 'rgba(0,0,0,0.8)',
                borderWidth: 1,
                pointStyle: 'circle',
                borderColor: 'rgba(0,0,0,0.8)'
            }
        }
    }
});
