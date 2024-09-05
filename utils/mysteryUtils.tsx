export function getCurrentMystery() {
    const date = new Date();
    const day = date.getDay(); 

    const mysteries = {
        en: '',
        es: '',
        fr: ''
    };

    switch (day) {
        case 0: // Sunday
        case 3: // Wednesday
            mysteries.en = `${day === 0 ? 'Sunday' : 'Wednesday'} - Glorious Mysteries`;
            mysteries.es = `${day === 0 ? 'Domingo' : 'Miércoles'} - Misterios Gloriosos`;
            mysteries.fr = `${day === 0 ? 'Dimanche' : 'Mercredi'} - Mystères Glorieux`;
            break;
        case 1: // Monday
        case 6: // Saturday
            mysteries.en = `${day === 1 ? 'Monday' : 'Saturday'} - Joyful Mysteries`;
            mysteries.es = `${day === 1 ? 'Lunes' : 'Sábado'} - Misterios Gozosos`;
            mysteries.fr = `${day === 1 ? 'Lundi' : 'Samedi'} - Mystères Joyeux`;
            break;
        case 2: // Tuesday
        case 5: // Friday
            mysteries.en = `${day === 2 ? 'Tuesday' : 'Friday'} - Sorrowful Mysteries`;
            mysteries.es = `${day === 2 ? 'Martes' : 'Viernes'} - Misterios Dolorosos`;
            mysteries.fr = `${day === 2 ? 'Mardi' : 'Vendredi'} - Mystères Douloureux`;
            break;
        case 4: // Thursday
            mysteries.en = "Thursday - Luminous Mysteries";
            mysteries.es = "Jueves - Misterios Luminosos";
            mysteries.fr = "Jeudi - Mystères Lumineux";
            break;
    }

    return mysteries;
}