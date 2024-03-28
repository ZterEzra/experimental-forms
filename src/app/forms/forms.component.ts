import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  petForm = this.formBuilder.group({
    petType: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });
  nameLabel = 'Name';

  // Provide a map of pet types to name labels
  private animalNameLabels = new Map<string, string>([
    ['cat', "Cat's name"],
    ['dog', "Dog's name"],
  ]);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializePetTypeChangeSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializePetTypeChangeSubscription(): void {
    this.petForm
      .get('petType')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.nameLabel = this.getNameLabel(value);
        },
      });
  }

  getErrorMessage(formControlName: string) {
    if (this.petForm.get(formControlName)?.hasError('required')) {
      return 'This field is required';
    }

    return 'Invalid field value!';
  }

  getNameLabel(value: string | null): string {
    if (!value) {
      return "Pet's name";
    }

    return this.animalNameLabels.get(value) || "Pet's name";
  }
}
