import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatSideNavComponent } from './chat-side-nav.component';
import { MatDrawer} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ChatSideNavComponent', () => {
  let component: ChatSideNavComponent;
  let fixture: ComponentFixture<ChatSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatSideNavComponent],
      imports: [
        MatDrawer,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        RouterTestingModule.withRoutes([]),
        MatSidenavModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
