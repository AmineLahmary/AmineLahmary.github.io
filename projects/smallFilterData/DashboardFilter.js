import DataList from "./dataList.js";

export default function dashboardFilter(dataWrapper) {
   const filterData = [
      {
         id: 'todos',
         icon: ['fa-solid', 'fa-list'],
         text: 'Todo'
      },
      {
         id: 'posts',
         icon: ['fa-regular', 'fa-paste'],
         text: 'Posts'
      },
      {
         id: 'users',
         icon: ['fa-solid', 'fa-users'],
         text: 'Users'
      }
   ];
   let classes = [];

   const doFilter = e => {
      const filterValue = e.target.value;
      
      showData(e, filterValue);
   }

   const showData = (e, filterValue) => {

      document.querySelector('.spiner')?.remove();
      const spiner = document.createElement("span");
      spiner.classList.add('spiner');
  
      e.target.nextSibling.appendChild(spiner);
  
      const request = new XMLHttpRequest();
  
      request.addEventListener('readystatechange', () => {
         
          if(request.readyState === 4 && request.status === 200) {
              todosWrapper.innerHTML = "";
              todosWrapper.appendChild( DataList(request.responseText) );
              spiner.remove();
          }
      });
  
      request.open('GET', `https://jsonplaceholder.typicode.com/${filterValue}/`);
      request.send();
   }

   const filterList = filterData.map(item => {

      const li = document.createElement('li');
      classes = ["flex", "justify-center", "relative"];
      li.classList.add(...classes);

      const label = document.createElement('label');
      classes = ["rounded-md", "px-2", "py-3", "md:px-5", "flex", "w-full", "justify-center", "md:justify-start", "items-center" , "gap-3"];
      label.classList.add(...classes);
      label.innerHTML = `<span class="hidden md:flex">${item.text}</span>`;
      label.setAttribute("for", item.id);

      const radio = document.createElement('input');
      classes = ["opacity-0", "pointer-events-none", "absolute"];
      radio.type = "radio";
      radio.id = item.id;
      radio.name = "data_filter";
      radio.value = item.id
      radio.classList.add(...classes);
      radio.addEventListener('click', doFilter)

      const icon = document.createElement('i');
      icon.classList.add(...item.icon);

      label.prepend(icon);
      li.append(radio, label);
      
      return li;
   });

   

   return filterList;
}