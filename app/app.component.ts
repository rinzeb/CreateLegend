import {
    Component,
    Directive
} from '@angular/core';

import {
    ColorPickerDirective
} from 'angular2-color-picker';

/**
 * the Legend class provides a data structure that is used to map a value to a color
 * (see also the function getColor())
 */
export class Legend {
    id: string;
    description: string;
    legendKind: string;
    visualAspect: string;
    legendEntries: LegendEntry[];
    // it is assumed that the legendentries have their values and/or intervals
    // sorted in ascending order
}

export class LegendEntry {
    label: string;
    interval ? : {
        min: number;
        max: number;
    }; // either interval or value is used, depending on legendtype (discrete or interpolated)
    value ? : number;
    stringValue ? : string;
    color: string; // hex string; rgb
}

@Component({
    selector: 'my-app',
    templateUrl: 'app/createlegend.tpl.html'
})

export class AppComponent {
    legendEntries: LegendEntry[] = [{
        label: 'Groep 1',
        interval: {
            min: 12,
            max: 14
        },
        color: '#eeeeee'
    }];
    legend: Legend = < Legend > {
        id: 'profiel3',
        description: 'Functioneringsprofiel 3',
        legendKind: 'discrete',
        visualAspect: 'fillColor',
        legendEntries: this.legendEntries
    };

    legendJSON: string = '';

    setLegendJSON = () => {
        this.legendJSON = JSON.stringify(this.legend, null, 4);
    };

    saveLegendJSON = () => {
        this.setLegendJSON();
        this.saveData(this.legendJSON, this.legend.description || 'legend', 'json');
    };

    parseLegendJSON = () => {
        try {
            this.legend = JSON.parse(this.legendJSON);
            this.setLegendJSON();
        } catch (e) {
            console.log(e);
        }
    };

    addLegendEntry = () => {
        let le = < LegendEntry > {};
        le.label = `Groep ${this.legendEntries.length + 1}`;
        le.interval = {
            min: 0,
            max: 0
        };
        if (this.legendEntries.length > 0) {
            let prevMax = this.legendEntries[this.legendEntries.length - 1].interval.max;
            le.interval = {
                min: prevMax,
                max: prevMax + 2
            };
        }

        this.legend.legendEntries.push(le);
    }

    deleteLegendEntry = (label: string) => {
        let indexToRemove: number = -1;
        this.legendEntries.some((le, index) => {
            if (le.label === label) {
                indexToRemove = index;
                return true;
            }
        });
        if (indexToRemove >= 0) {
            this.legendEntries.splice(indexToRemove, 1);
        }
    }

    /**
     * Export data to the file system.
     */
    saveData = (data: string, filename: string, fileType: string) => {
        fileType = fileType.replace('.', '');
        // if the filename already contains a type, first remove it before adding it.
        filename = filename.replace('.' + fileType, '') + '.' + fileType;

        if (navigator.msSaveBlob) {
            // IE 10+
            let link: any = document.createElement('a');
            link.addEventListener('click', (event: any) => {
                let blob = new Blob([data], {
                    'type': 'text/' + fileType + ';charset=utf-8;'
                });
                navigator.msSaveBlob(blob, filename);
            }, false);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            // Support for browsers that support the data uri.
            let a: any = document.createElement('a');
            document.body.appendChild(a);
            a.href = 'data:    text/' + fileType + ';charset=utf-8,' + encodeURI(data);
            a.target = '_blank';
            a.download = filename;
            a.click();
            document.body.removeChild(a);
        }
    };
}