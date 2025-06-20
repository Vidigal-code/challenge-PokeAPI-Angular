import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FavoritesPage } from './favorites.page';
import { PokeApiService } from '../services/poke-api.service';
import { FavoritesService } from '../services/favorites.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

/**
 * Test suite for the FavoritesPage component.
 * Tests the component's creation, loading of favorites, navigation, and pagination functionality.
 */
describe('FavoritesPage', () => {

  /** The FavoritesPage component instance under test. */
  let component: FavoritesPage;

  /** The ComponentFixture for the FavoritesPage component. */
  let fixture: ComponentFixture<FavoritesPage>;

  /** Mocked PokeApiService with spied methods. */
  let pokeApiService: jasmine.SpyObj<PokeApiService>;

  /** Mocked Router with spied methods. */
  let router: jasmine.SpyObj<Router>;

  /** Injected FavoritesService instance. */
  let favoritesService: FavoritesService;

  /**
   * Sets up the testing module and component before each test.
   * Configures mocks for PokeApiService and Router, and initializes the component.
   */
  beforeEach(async () => {
    const pokeApiSpy = jasmine.createSpyObj('PokeApiService', ['getPokemonByNameOrId']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, HttpClientTestingModule, FavoritesPage],
      providers: [
        { provide: PokeApiService, useValue: pokeApiSpy },
        { provide: Router, useValue: routerSpy },
        FavoritesService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
    pokeApiService = TestBed.inject(PokeApiService) as jasmine.SpyObj<PokeApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    favoritesService = TestBed.inject(FavoritesService);
  });

  /**
   * Tests that the FavoritesPage component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Tests that the component loads an empty favorites list when no favorites exist.
   * Verifies that allFavorites, favorites, total, and loading are set correctly.
   */
  it('should load empty favorites when none exist', fakeAsync(() => {
    spyOn(favoritesService, 'getFavorites').and.returnValue([]);

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.allFavorites).toEqual([]);
    expect(component.favorites).toEqual([]);
    expect(component.total).toBe(0);
    expect(component.loading).toBeFalse();
  }));

  /**
   * Tests that the component navigates to the details page for a given Pokémon.
   * Verifies that the Router's navigate method is called with the correct route.
   */
  it('should navigate to details page', () => {
    const pokemon = { id: 1 };
    component.goToDetails(pokemon);
    expect(router.navigate).toHaveBeenCalledWith(['/details', 1]);
  });

  /**
   * Tests that removing a favorite Pokémon updates the favorites list and pagination.
   * Verifies that FavoritesService.removeFavorite is called and component state is updated.
   */
  it('should remove favorite and update pagination', fakeAsync(() => {
    component.allFavorites = [
      { id: 1, name: 'bulbasaur', image: 'img1.png' },
      { id: 25, name: 'pikachu', image: 'img25.png' }
    ];
    component.total = 2;
    component.favorites = component.allFavorites;
    spyOn(favoritesService, 'removeFavorite');

    component.removeFavorite(1);
    tick();

    expect(favoritesService.removeFavorite).toHaveBeenCalledWith(1);
    expect(component.allFavorites).toEqual([{ id: 25, name: 'pikachu', image: 'img25.png' }]);
    expect(component.favorites).toEqual([{ id: 25, name: 'pikachu', image: 'img25.png' }]);
    expect(component.total).toBe(1);
  }));

  /**
   * Tests that clearing all favorites resets the favorites list and pagination.
   * Verifies that FavoritesService.clearFavorites is called and component state is reset.
   */
  it('should clear favorites and reset pagination', fakeAsync(() => {
    component.allFavorites = [
      { id: 1, name: 'bulbasaur', image: 'img1.png' },
      { id: 25, name: 'pikachu', image: 'img25.png' }
    ];
    component.total = 2;
    component.offset = 20;
    spyOn(favoritesService, 'clearFavorites');

    component.clearFavorites();
    tick();

    expect(favoritesService.clearFavorites).toHaveBeenCalled();
    expect(component.allFavorites).toEqual([]);
    expect(component.favorites).toEqual([]);
    expect(component.total).toBe(0);
    expect(component.offset).toBe(0);
  }));

  /**
   * Tests that navigating to the next page updates the offset and favorites list.
   * Verifies that the correct number of Pokémon is displayed on the next page.
   */
  it('should navigate to next page', () => {
    component.allFavorites = new Array(30).fill(null).map((_, i) =>
      ({ id: i + 1, name: `poke${i + 1}`, image: `img${i + 1}.png` }));
    component.total = 30;
    component.offset = 0;
    component.limit = 20;

    component.nextPage();
    expect(component.offset).toBe(20);
    expect(component.favorites.length).toBe(10);
  });

  /**
   * Tests that navigating to the previous page updates the offset and favorites list.
   * Verifies that the correct number of Pokémon is displayed on the previous page.
   */
  it('should navigate to previous page', () => {
    component.allFavorites = new Array(30).fill(null).map((_, i) =>
      ({ id: i + 1, name: `poke${i + 1}`, image: `img${i + 1}.png` }));
    component.total = 30;
    component.offset = 20;
    component.limit = 20;

    component.prevPage();
    expect(component.offset).toBe(0);
    expect(component.favorites.length).toBe(20);
  });
});
