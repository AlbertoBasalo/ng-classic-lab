# Add Route

> Example for route `Home`

## 1.- Generate module with routing

Using the generator:

```bash
ng generate module routes/home --routing --module=app.module
```

Or manually:

### 1.1.- Create the routing module

Create the file `\home-routing.module.ts` in the folder `routes/home` with the following content:

```typescript
const routes: Routes = [];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
```

### 1.2.- Create the feature module

Create the file `\home.module.ts` in the folder `routes/home` with the following content:

```typescript
@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  exports: [RouterModule],
})
export class HomeModule {}
```

### 1.3.- Add the module to the app routing module

Add the module as lazy-loaded to the app routing module at `\app-routing.module.ts`:

```typescript
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

Or manually:

### 2.1.- Create the page component

Create the file `\home.page.ts` in the folder `routes/home` with the following content:

```typescript
@Component({
  templateUrl: "./home.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
```

### 2.2.- Create the page template

Create the file `\home.page.html` in the folder `routes/home` with the following content:

```html
<p>Home Page works!</p>
```

### 2.3.- Add the route to the feature module

Add the route to the feature module at `\home-routing.module.ts`:

```typescript
const routes: Routes = [{ path: "", component: HomePage, title: "Home" }];
```

## 3.- Generate service

Using the generator:

```bash
ng generate service routes/home/home --skip-tests
```

Or manually:

### 3.1.- Create the service

Create the file `\home.service.ts` in the folder `routes/home` with the following content:

```typescript
@Injectable({
  providedIn: "root",
})
export class HomeService {}
```

### 3.2.- Add the service to the page component

Add the service to the page component at `\home.page.ts`:

```typescript
@Component({
  templateUrl: "./home.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  constructor(private readonly homeService: HomeService) {}
}
```

## 4.- Generate presenter component

```bash
ng generate component routes/home/banner --export=false --inline-style --skip-tests --change-detection=OnPush --flat
```

### 4.1.- Create the presenter component

Create the file `\banner.component.ts` in the folder `routes/home` with the following content:

```typescript
@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {}
```

### 4.2.- Create the presenter template

Create the file `\banner.component.html` in the folder `routes/home` with the following content:

```html
<p>Banner Component works!</p>
```

### 4.3.- Add presenter to page

Add the presenter to the page at `\home.page.html`:

```html
<app-banner></app-banner>
```
