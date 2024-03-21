import { Component } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-competition-pdf',
  templateUrl: './competition-pdf.component.html',
  styleUrls: ['./competition-pdf.component.css']
})
export class CompetitionPDFComponent {
  generatePDF() {
    const elementToPrint: any = document.getElementById('contentToConvert');
    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF()
 ;
      pdf.setProperties({
        title: 'Competition Details',
        subject: 'Details of the competition',
        author: 'Mostfa Jenhani'
      });
      pdf.setFontSize(12); // Fixed typo: 'setFontsize' to 'setFontSize'
      pdf.text('oyyyy', 10, 10); // Added sample text at coordinates (10, 10)
      pdf.save('myFile.pdf');
    });
  }
  downloadPDF() {
    this.generatePDF();
  }
}
