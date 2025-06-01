import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitting = false;
  successMessage = '';
  errorMessage = '';

  private formspreeUrl = 'https://formspree.io/f/xnnvaejv'; // ← replace XXXXXXXX

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.contactForm.value;
    this.http
      .post(this.formspreeUrl, formValue, {
        headers: { 'Accept': 'application/json' }
      })
      .subscribe({
        next: () => {
          this.successMessage = 'Thank you—your message has been sent!';
          this.submitting = false;
          this.contactForm.reset();
        },
        error: () => {
          this.errorMessage = 'Oops! Something went wrong. Please try again later.';
          this.submitting = false;
        }
      });
  }
}
