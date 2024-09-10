const addFlightButton = document.querySelector(".add-flight-button");
  const addInputsContainer = document.getElementById("AddInputs");

  addFlightButton.addEventListener("click", function () {
   
    let toValue = '';
    const lastFlightTo = document.querySelectorAll('[id^="MultyCityTo_"]');
    
    if (lastFlightTo.length > 0) {
     
      toValue = lastFlightTo[lastFlightTo.length - 1].value;
    } else {
     
      const firstFrom = document.getElementById('MultyCityFrom');
      if (firstFrom) {
        toValue = firstFrom.value; 
      }
    }
  
  
    let jetSizeValue = '';
    const lastJetSize = document.querySelectorAll('[id^="MultyCityJetSize_"]');
    if (lastJetSize.length > 0) {
      jetSizeValue = lastJetSize[lastJetSize.length - 1].value; 
    } else {
     
      const originalJetSize = document.getElementById('AvionTipe');
      if (originalJetSize) {
        jetSizeValue = originalJetSize.value;
      }
    }
  
    const uniqueId = Date.now(); 
    const inputTemplate = `
      <div class="added-flight gap-5 grid md:grid-cols-2">
        <div class="w-full bg-white flex flex-row items-center h-auto pl-5 relative">
          <label for="MultyCityFrom_${uniqueId}" class="flex gap-3 w-3/12 xl:w-2/12">
            <img class="w-[20px]" src="assets/img/icon-from.svg" alt="">
            <p>From</p>
          </label>
          <input value="${toValue}" class="h-[45px] w-9/12 xl:w-10/12 pl-5 INPUTAIR" type="text" id="MultyCityFrom_${uniqueId}" required autocomplete="off">
          <div class="suggestions-box absolute left-0 top-[45px] bg-white border border-gray-300 max-h-60 overflow-auto z-10 md:w-full"></div>
        </div>
        <div class="w-full bg-white flex flex-row items-center h-auto pl-5 relative">
          <label for="MultyCityTo_${uniqueId}" class="flex gap-3 w-3/12 xl:w-2/12">
            <img class="w-[20px]" src="assets/img/icon-to.svg" alt="">
            <p>To</p>
          </label>
          <input class="h-[45px] w-9/12 xl:w-10/12 pl-5 INPUTAIR" type="text" id="MultyCityTo_${uniqueId}" required autocomplete="off">
          <div class="suggestions-box absolute left-0 top-[45px] bg-white border border-gray-300 max-h-60 overflow-auto z-10 md:w-full"></div>
        </div>
        <div class="w-full bg-white flex items-center h-[45px] pl-5">
          <div class="flex gap-2 items-center justify-start w-min">
            <img class="w-[20px] menos-MultyCity" src="assets/img/icon-menos.svg" alt="">
            <div class="flex items-center justify-start">
              <input id="MultyCityPassergers_${uniqueId}" placeholder="0" value="1" min="1" class="h-[45px] w-[35px] text-center" type="number" required>
              <p class="singlePassengerMultyCity">Passenger</p>
              <p class="multiplePassengersMultyCity hidden">Passengers</p>
            </div>
            <img class="w-[20px] plus-MultyCity" src="assets/img/icon-mas.svg" alt="">
          </div>
        </div>
        <div class="w-full bg-white flex items-center h-[45px] pl-5">
          <label class="flex gap-3 w-8/12 xl:w-3/12 text-sm">
            <img class="w-[20px]" src="assets/img/icon-calendar.svg" alt="">
            <p class="text-[#949695]">Date and time</p>
          </label>
          <input placeholder="--/--/----" class="h-[45px] w-full" id="MultyCityDate_${uniqueId}" type="datetime-local" name="MultyCityDate" required>
        </div>
        <div class="w-full bg-white flex items-center h-[45px] px-5 gap-3">
          <img class="w-[20px]" src="assets/img/icon-jet.svg" alt="">
          <select class="w-full" name="jetSize" id="MultyCityJetSize_${uniqueId}">
            <option value="">Jet size preference</option>
            <option value="Turbo Prop" ${jetSizeValue === "Turbo Prop" ? "selected" : ""}>Turbo Prop</option>
            <option value="Light Jet" ${jetSizeValue === "Light Jet" ? "selected" : ""}>Light Jet</option>
            <option value="Midsize Jet" ${jetSizeValue === "Midsize Jet" ? "selected" : ""}>Midsize Jet</option>
            <option value="Supermid Jet" ${jetSizeValue === "Supermid Jet" ? "selected" : ""}>Supermid Jet</option>
            <option value="Heavy Jet" ${jetSizeValue === "Heavy Jet" ? "selected" : ""}>Heavy Jet</option>
            <option value="Ultra Long Range" ${jetSizeValue === "Ultra Long Range" ? "selected" : ""}>Ultra Long Range</option>
          </select>
        </div>
        <button class="remove-flight-btn">Remove</button>
      </div>
    `;
  
    const newInputContainer = document.createElement("div");
    newInputContainer.innerHTML = inputTemplate;
    addInputsContainer.appendChild(newInputContainer);
  

    flatpickr(`#MultyCityDate_${uniqueId}`, {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      time_24hr: true
    });
  

    const removeButton = newInputContainer.querySelector(".remove-flight-btn");
    removeButton.addEventListener("click", function () {
      newInputContainer.remove();
    });
  

    const plusButtonMultyCity = newInputContainer.querySelector(".plus-MultyCity");
    const minusButtonMultyCity = newInputContainer.querySelector(".menos-MultyCity");
    const MultyCityPassergers = newInputContainer.querySelector(`#MultyCityPassergers_${uniqueId}`);
    const singlePassengerTextMultyCity = newInputContainer.querySelector(".singlePassengerMultyCity");
    const multiplePassengersTextMultyCity = newInputContainer.querySelector(".multiplePassengersMultyCity");
  
    function updatePassengerTextMultyCity() {
      if (parseInt(MultyCityPassergers.value) > 1) {
        singlePassengerTextMultyCity.classList.add("hidden");
        multiplePassengersTextMultyCity.classList.remove("hidden");
      } else {
        singlePassengerTextMultyCity.classList.remove("hidden");
        multiplePassengersTextMultyCity.classList.add("hidden");
      }
    }
  
    plusButtonMultyCity.addEventListener("click", function () {
      MultyCityPassergers.value = parseInt(MultyCityPassergers.value) + 1;
      updatePassengerTextMultyCity();
    });
  
    minusButtonMultyCity.addEventListener("click", function () {
      if (parseInt(MultyCityPassergers.value) > 1) {
        MultyCityPassergers.value = parseInt(MultyCityPassergers.value) - 1;
        updatePassengerTextMultyCity();
      }
    });
  
    updatePassengerTextMultyCity();
  
    // Inicializar la funcionalidad de autocompletar para los nuevos inputs
    const newInputs = newInputContainer.querySelectorAll('.INPUTAIR');
    newInputs.forEach(input => {
      initializeAutocomplete(input);
    });
  
    // Disparar la búsqueda de vuelos cuando los inputs cambien
    newInputs.forEach(input => {
      input.addEventListener('change', () => triggerSearchFlights(input));
    });
  });
