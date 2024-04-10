export default function dataList(data) {

    const dataListWrapper = document.createElement('ul');
    let classes = ["grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4", "gap-4" , "w-full"];

    dataListWrapper.classList.add(...classes);
    
    data = JSON.parse(data || '[]');
    dataListWrapper.innerHTML = '';

    data.forEach(item => {
        const li = document.createElement('li');
        classes = ["shadow", "p-4", "hover:bg-gray-100", "cursor-pointer", "min-h-[6rem]", "relative", "bg-white", "rounded-lg", "duration-200", "flex", "flex-col", "gap-4", "slidein"];
        li.classList.add(...classes);

        const title = document.createElement('h3');
        classes = ["truncate", "font-semibold"];
        title.classList.add(...classes);
        

        if(item.title) {

            title.textContent = item.title;

            li.append(title);

        } 

        if(item.completed) {

            const itemStatus = document.createElement("span");
            itemStatus.textContent = item.completed ? "Done": '';
            classes = ["flex", "text-sm", "absolute", "bottom-2", "bg-green-200", "px-3", "rounded-xl"];
            itemStatus.classList.add(...classes);


            li.appendChild(itemStatus);
        }

        if(item.body) {

            const p = document.createElement('p');
            p.classList.add("text-gray-500");
            p.textContent = item.body;

            li.appendChild(p);
        }

        if(item.username) {
            const avatar = document.createElement('div');
            classes = ["bg-gray-200", "rounded-full", "h-[4rem]", "w-[4rem]", "avatar"];
            avatar.classList.add(...classes);

            const email = document.createElement('p');
            email.classList.add("text-gray-500");
            email.textContent = item.email;

            title.textContent = item.name;

            li.classList.add('items-center');
            li.prepend(avatar, title, email);
        }

        dataListWrapper.appendChild(li);
    });

    return dataListWrapper;
}