function headerFunctionality() {

    const openBtn  = document.querySelector('[data-open-searchbx]');
    const closeBtn = document.querySelector('[data-close-searchbx]');
    const searchbx = document.querySelector('.search_container');
  
    const handleOpen = () => {
      searchbx.classList.add('active-search');
    };
  
    const handleClose = () => {
      searchbx.classList.remove('active-search');
    };
  
    return {
      init: function() {
        openBtn.addEventListener('click', handleOpen);
        closeBtn.addEventListener('click', handleClose);
      },
    };

}
  
headerFunctionality().init();
  