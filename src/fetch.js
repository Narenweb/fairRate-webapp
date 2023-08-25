document.addEventListener('DOMContentLoaded', async () => {
  const dataContainer = document.getElementById('data-container');
  const loadMoreButton = document.getElementById('load-more');
  const goBackButton = document.getElementById('go-back');

  let currentPage = 1;
  const rowsPerPage = 8;
  let totalRowsFetched = 0;

  async function fetchDataAndPopulateHTML(page) {
    try {
      const response = await fetch(`https://64e5ed4809e64530d17f43d0.mockapi.io/data?page=${page}&limit=${rowsPerPage}`);
      const jsonData = await response.json();

      dataContainer.innerHTML = '';

      jsonData.forEach(data => {
        const row = document.createElement('tr');
        row.classList.add('data', 'h-28', 'mt-4', 'flex', 'w-full', 'justify-between', 'px-4', 'items-center');
        row.innerHTML = generateDataRow(data);
        dataContainer.appendChild(row);
        totalRowsFetched++;
      });

      updateButtonStates();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  //handling button forword and backword
  function updateButtonStates() {
    if (currentPage === 1) {
      goBackButton.style.opacity = 0.5;
      goBackButton.disabled = true;
    } else {
      goBackButton.style.opacity = 1;
      goBackButton.disabled = false;
    }

    if (totalRowsFetched >= currentPage * rowsPerPage) {
      loadMoreButton.style.opacity = 1;
      loadMoreButton.disabled = false;
    } else {
      loadMoreButton.style.opacity = 0.5;
      loadMoreButton.disabled = true;
    }
  }

  fetchDataAndPopulateHTML(currentPage);

  loadMoreButton.addEventListener('click', () => {
    currentPage++;
    fetchDataAndPopulateHTML(currentPage);
  });

  goBackButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchDataAndPopulateHTML(currentPage);
    }
  });

  // Function to generate HTML structure for each data row
  function generateDataRow(data) {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `
      <td class="inline-block">
      <img src="${data.logo}?random=${randomNumber}" alt="logo" class="w-28 h-11 mb-4">
        <p class="text-sm text-gray-400">NMLS ID: ${data.nmlsID}</p>
      </td>
      <td class="text-center>
        <p class="percentage mb-1 font-light text">${data.apr}% APR</p>
        <p class="text-sm text-gray-400">Mar 10</p>
      </td>
      <td class="w-32 text-center">
        <p class="text-base mb-3">${data.rate}% Rate</p>
        <p class="text-sm text-gray-400">1 Point</p>
        <p class="text-sm text-gray-400">30 Rate Lock</p>
      </td>
      <td class="w-32 text-center">
        <p class="percentage">$${data.payment}<span class="text-sm text-gray-400">/mo</span></p>
        <p class="text-sm text-gray-400">1 Point</p>
        <p class="text-sm text-gray-400">30 Rate Lock</p>
      </td>
      <td>
        <p>${data.phoneNumber}</p>
        <p class="text-sm text-gray-400">Toll-free, no obligations</p>
      </td>
      <td>
      <a href="javascript:void(0);" class="py-3 px-7 next-btn text-sm text-white">NEXT</a>
      </td>
    `;
  }

  //second page filter fetch
  const filterContainer = document.getElementById('filter-container');

     

  // Function to fetch data from the mock API
  async function fetchData() {
    try {
      const response = await fetch('https://64e5ed4809e64530d17f43d0.mockapi.io/filter-data');
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  // Generate and populate the HTML structure for each data row
  async function populateDataRows() {
    const data = await fetchData();
  // rows
    const selectedYears = Array.from(
      document.querySelectorAll('.small-checkboxes input[type="checkbox"]:checked')
    ).map((checkbox) => parseInt(checkbox.value)); // Extract the values
// console.log(selectedYears);
    const selectedTypes = Array.from(document.querySelectorAll('.checkbox-container input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.value);
// console.log(selectedTypes);

    filterContainer.innerHTML = '';

    data.forEach((rowData, index) => {

      const row = document.createElement('tr');
      row.classList.add('py-5', 'flex', 'items-center', 'justify-between', 'border-b-4');

      //change type 
      let type = "Fixed";
      if (index >= 3 && index <= 6) {
        type = "Adjustable";
      }

      // //years color
      // const yearBgClass = index === 1 ? 'bg-[#8CABFF]' :
      //   index === 2 ? 'bg-yellow-500' :
      //     index === 3 ? 'bg-[#3D246C]' :
      //       index === 4 ? 'bg-[#EAC696]' :
      //         index === 5 ? 'bg-[#0B666A]' :
      //           index === 6 ? 'bg-[#E76161]' :
      //             'bg-green-400';

      //             //range color
      // const rangeColor = index === 1 ? 'bg-[#8CABFF]' :
      //   index === 2 ? 'bg-yellow-500' :
      //     index === 3 ? 'bg-[#3D246C]' :
      //       index === 4 ? 'bg-[#EAC696]' :
      //         index === 5 ? 'bg-[#0B666A]' :
      //           index === 6 ? 'bg-[#E76161]' :
      //             'bg-green-400';
               
                  function getRandomColor() {
                    const letters = '0123456789ABCDEF';
                    let color = '#';
                    for (let i = 0; i < 6; i++) {
                      color += letters[Math.floor(Math.random() * 16)];
                    }
                    return color;
                  }
                        if ((selectedYears.length === 0 || selectedYears.includes(rowData.years)) &&
      (selectedTypes.length === 0 || selectedTypes.includes(type))) {
      // Construct the content for each cell in the row using rowData properties
      const rowContent = `
        <td class="flex">
        <a href="javascript:void(0);" class="px-4 py-2 text-sm text-white rounded-full" style="background-color: ${getRandomColor()}">
      ${rowData.years} years
    </a>
          <div class="px-3 ml-3 py-2 w-24 text-center text-sm bg-gray-200 rounded-full">${type}</div>
        </td>
        <td class="flex item-center">
          <p class="text-sm text-gray-600">${rowData.rate1}%</p>
          <p class="text-sm  text-gray-400">/${rowData.rate2}%</p>
        </td>
        <td class="flex items-center">
          <p class="text-sm text-gray-600 underline">-$${rowData.amount1}</p>
          <div class="w-14 h-2 ml-3 bg-gray-300 rounded">
            <div class="fill rounded w-3/5 h-full " style="background-color: ${getRandomColor()}"></div>
          </div>
        </td>
        <td class="flex items-center">
          <p class="text-sm text-gray-600 underline">-$${rowData.amount2}</p>
          <div class="w-14 h-2 ml-3 bg-gray-300 rounded">
            <div class="fill rounded w-3/5 h-full" style="background-color: ${getRandomColor()}"></div>
          </div>
        </td>
      `;

      row.innerHTML = rowContent;
      filterContainer.appendChild(row);
                  }
    });
  }
const checkboxes = document.querySelectorAll('.small-checkboxes input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', populateDataRows);
});

//parent check box turn on and off
const typeCheckboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
typeCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', populateDataRows);
});

// Fetch data and populate HTML when the page loads
populateDataRows();

});
