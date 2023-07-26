export default function dragRow(data = []) {
    const rows = document.querySelectorAll('.item-row')
    const listItem = document.querySelector('.list-item')
    let draggedIndex = null;

    function dragItemRow() {
        rows.forEach(row => {
            row.addEventListener('dragstart', (event) => {
                draggedIndex = parseInt(event.currentTarget.getAttribute('data-index'));
                event.currentTarget.classList.add('dragging')
            })
        })
        rows.forEach(row => {
            row.addEventListener('dragend', (event) => {
                event.currentTarget.classList.remove('dragging')
            })
        })
    }

    function dragOver() {

       listItem.addEventListener('dragover', (e) => {
            e.preventDefault()
            const afterElement = getDraAfterElement(e.currentTarget, e.clientY)
            const draggingElement = document.querySelector('.dragging')
            if(afterElement == null) {
                e.currentTarget.appendChild(draggingElement)
            } else {
                e.currentTarget.insertBefore(draggingElement, afterElement)
            }
       })

       listItem.addEventListener("drop", (e) => {
        e.preventDefault();
        const dropTargetIndex = parseInt(e.target.getAttribute("data-index"));
        if (draggedIndex !== dropTargetIndex) {
          // Swap the elements in the data array
          [data[draggedIndex], data[dropTargetIndex]] = [
            data[dropTargetIndex],
            data[draggedIndex],
          ];
      
        }
      });
    }

    function getDraAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('[draggable]:not(.dragging)')]

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2
            if( offset < 0 && offset > closest.offset ) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }

    
    return {
        init: function() {
            dragItemRow()
            dragOver()
            return data
        }
    }
}
