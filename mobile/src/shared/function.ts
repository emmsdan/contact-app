export const ifNotEmpty = (value: any, fnc: any) => {
    if (!value) return;
    return fnc
}

export function colorfulLanguage(word: string, deepColor: boolean = false){

    if(word.length === 0){
        return 'hsl(0, 0, 100%);'
    }else{
        const sanitized = word.replace(/[^A-Za-z]/, '');
        const letters = sanitized.split('');

        //Determine the hue
        let hue = Math.floor((letters[0].toLowerCase().charCodeAt()-96)/26*(deepColor ? 255 : 360));
        let ord = 0;
        for(const i in letters){
            ord = letters[i].charCodeAt();
            if((ord >= 65 && ord <= 90) || (ord >= 97 && ord <= 122)){
                hue += ord-64;
            }
        }

        hue = hue%360;

        //Determine the saturation
        const vowels = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u'];
        let count_cons = 0;

        //Count the consonants
        for(const i in letters){
            if(vowels.indexOf(letters[i]) == -1){
                count_cons++;
            }
        }

        //Determine what percentage of the string is consonants and weight to 95% being fully saturated.
        let saturation = count_cons/letters.length/(deepColor ? 0.20 : 0.95)*100;
        if(saturation > 100) saturation = 100;

        //Determine the luminosity
        const ascenders = ['t','d','b','l','f','h','k'];
        const descenders = ['q','y','p','g','j'];
        let luminosity = 50;
        let increment = 1/letters.length*50;

        for(const i in letters){
            if(ascenders.indexOf(letters[i]) != -1){
                luminosity += increment;
            }else if(descenders.indexOf(letters[i]) != -1){
                luminosity -= increment*2;
            }
        }
        if(luminosity > 100) luminosity = 100;

        return `hsl(${hue}, ${saturation}%, ${deepColor ? 20 : luminosity}%)`;
    }
}