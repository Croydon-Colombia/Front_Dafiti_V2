import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss'],
})
export class CustomSnackbarComponent {
    @Input() message: string;

    constructor(private snackBar: MatSnackBar) {} // Inyecta MatSnackBar en el constructor

    closeSnackbar() {
        this.snackBar.dismiss(); // Cierra el snackbar al hacer clic en el botón "cerrar"
    }
}
