window.addEventListener('load',()=> {
    setEventFocusAndBlurInputs();
});

function setEventFocusAndBlurInputs(){
    const input = getAllInput();

    input.forEach((input)=> {
        input.addEventListener('blur', handleChangeLabelColorInput);
        input.addEventListener('focus', handleChangeLabelColorInput);
    });
}

function handleChangeLabelColorInput (event){
    const label = event.target.parentNode;
    const classNameLabel = label.getAttribute('class');

    switch (event.type) {
        case 'focus':

            const classNameLabelFocus = `${classNameLabel}__focus`;
            label.classNameFocus = classNameLabelFocus;
            label.classList.add(classNameLabelFocus);

            break;

        default:
            if(label.classNameFocus){
                label.classList.remove(label.classNameFocus);
            }
            break;
    }
}

function getAllInput(){
    const [...inputs] = document.querySelectorAll('input');
    return inputs;
}