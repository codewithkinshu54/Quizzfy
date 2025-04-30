document.addEventListener('DOMContentLoaded', () => {
    const leaderboard = [
        { name: "Alex", category: "Math", score: 98, time: "1:45", date: "2025-04-16" },
        { name: "Jamie", category: "Science", score: 95, time: "2:15", date: "2025-04-16" },
        { name: "Riley", category: "GK", score: 90, time: "1:50", date: "2025-04-15" },
        { name: "Sam", category: "Math", score: 85, time: "2:30", date: "2025-04-17" },
        { name: "Taylor", category: "Coding", score: 80, time: "2:00", date: "2025-04-14" }
    ];

    const tableBody = document.getElementById('leaderboard-data');
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');

    function displayLeaderboard(filteredLeaderboard) {
        tableBody.innerHTML = '';
        filteredLeaderboard.forEach((user, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.category}</td>
                    <td>${user.score}</td>
                    <td>${user.time}</td>
                    <td>${user.date}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    function filterLeaderboard() {
        const searchQuery = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredLeaderboard = leaderboard.filter(user => {
            const matchesCategory = selectedCategory === 'all' || user.category === selectedCategory;
            const matchesSearch = user.name.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        displayLeaderboard(filteredLeaderboard);
    }

    searchBar.addEventListener('input', filterLeaderboard);
    categoryFilter.addEventListener('change', filterLeaderboard);

    displayLeaderboard(leaderboard);
});

