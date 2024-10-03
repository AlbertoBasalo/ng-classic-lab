# Add Route

> Example for route `Home`

## 1.- Generate module with routing

Using the generator:

```bash
ng generate module routes/home --routing --module=app.module
```

Or manually:

```typescript
// \src\app\routes\home\home-routing.module.ts
const routes: Routes = [];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

// \src\app\routes\home\home.module.ts
@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  exports: [RouterModule],
})
export class HomeModule {}

// \src\app\app-routing.module.ts
const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("@app/home").then((module) => module.HomeModule),
  },
];
```

## 2.- Generate page component

Using the generator:

```bash
ng generate component routes/home/home --type=page --export=false --skip-selector --inline-style --skip-tests --change-detection=OnPush --flat
```

Or Manually:

```typescript
// \src\app\routes\home\home.page.ts
@Component({
  templateUrl: "./home.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
```

```html
<!-- \src\app\routes\home\home.page.html -->
<p>Home Page works!</p>
```

## 3.- Add route to feature module

```typescript
// \src\app\routes\home\home-routing.module.ts
const routes: Routes = [{ path: "", component: HomePage, title: "Home" }];
```

## 4.- Generate service

Using the generator:

```bash
ng generate service routes/home/home --skip-tests
```

Or manually:

```typescript
// \src\app\routes\home\home.service.ts
@Injectable({
  providedIn: "root",
})
export class HomeService {}

// \src\app\routes\home\home.page.ts
@Component({
  templateUrl: "./home.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  constructor(private readonly homeService: HomeService) {}
}
```

## 5.- Generate presenter component

```bash
ng generate component routes/home/banner --export=false --inline-style --skip-tests --change-detection=OnPush --flat
```

```typescript
// \src\app\routes\home\banner\banner.component.ts
@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {}
```

```html
<!-- \src\app\routes\home\banner\banner.component.html -->
<p>Banner Component works!</p>
```

## 6.- Add presenter to page

```html
<!-- \src\app\routes\home\home.page.html -->
<app-banner></app-banner>
```
