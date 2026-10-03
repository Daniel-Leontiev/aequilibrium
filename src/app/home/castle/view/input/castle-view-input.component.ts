import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CustomControlDestroyNotifier } from '../../../../core/controls/custom-control-destroy-notifier';
import { isCastleInputDataValid } from '../castle-view.config';
import { CastleViewFacade } from '../castle-view.facade';

@Component({
  selector: 'cmp-castle-view-input',
  templateUrl: './castle-view-input.component.html',
  styleUrls: ['./castle-view-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CastleViewInputComponent extends CustomControlDestroyNotifier implements OnInit {
  @Input() maxLength = 200;

  form: FormGroup;
  readonly dataControlName = 'data';

  constructor(
    private formBuilder: FormBuilder,
    private castleViewFacade: CastleViewFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      data: [null, [Validators.required, Validators.maxLength(this.maxLength), this.inputValidator()]]
    });

    this.sink = this.form.get(this.dataControlName)
      .valueChanges
      .pipe(
        tap(value => this.castleViewFacade.inputData = value)
      )
      .subscribe();

    this.form.get(this.dataControlName).setValue('3,3,10,4,5,6,6,6,2,2,7');
  }

  private inputValidator(): ValidatorFn {
    return ({ value }: FormControl): ValidationErrors | null => {
      if (!!value && !isCastleInputDataValid(value)) {
        return { data: true };
      }

      return null;
    };
  }
}
