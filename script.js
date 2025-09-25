function toggleAttendingFields() {
    const attendingYes = document.getElementById('attending-yes');
    const attendingFields = document.getElementById('attending-fields');
    
    if (attendingYes.checked) {
        attendingFields.classList.remove('hidden');
    } else {
        attendingFields.classList.add('hidden');
        // Also hide sub-fields when not attending
        document.getElementById('staying-fields').classList.add('hidden');
        document.getElementById('not-staying-fields').classList.add('hidden');
        document.getElementById('has-car-fields').classList.add('hidden');
        document.getElementById('no-car-fields').classList.add('hidden');
    }
}

function toggleStayingFields() {
    const stayingYes = document.getElementById('staying-yes');
    const stayingFields = document.getElementById('staying-fields');
    const notStayingFields = document.getElementById('not-staying-fields');
    
    if (stayingYes.checked) {
        stayingFields.classList.remove('hidden');
        notStayingFields.classList.add('hidden');
    } else {
        stayingFields.classList.add('hidden');
        notStayingFields.classList.remove('hidden');
    }
}

function toggleCarFields() {
    const hasCarYes = document.getElementById('car-yes');
    const hasCarFields = document.getElementById('has-car-fields');
    const noCarFields = document.getElementById('no-car-fields');
    
    if (hasCarYes.checked) {
        hasCarFields.classList.remove('hidden');
        noCarFields.classList.add('hidden');
    } else {
        hasCarFields.classList.add('hidden');
        noCarFields.classList.remove('hidden');
    }
}
