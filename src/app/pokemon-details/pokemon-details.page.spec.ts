import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailsPage } from './pokemon-details.page';
import { PokeApiService } from '../services/poke-api.service';
import { FavoritesService } from '../services/favorites.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

/**
 * Test suite for the PokemonDetailsPage component.
 * Tests the component's creation, loading of Pokémon details, favorite toggling, and navigation functionality.
 */
describe('PokemonDetailsPage', () => {

  /** The PokemonDetailsPage component instance under test. */
  let component: PokemonDetailsPage;

  /** The ComponentFixture for the PokemonDetailsPage component. */
  let fixture: ComponentFixture<PokemonDetailsPage>;

  /** Mocked PokeApiService with spied methods. */
  let pokeApiService: jasmine.SpyObj<PokeApiService>;

  /** Mocked Router with spied methods. */
  let router: jasmine.SpyObj<Router>;

  /** Injected FavoritesService instance. */
  let favoritesService: FavoritesService;

  /**
   * Sets up the testing module and component before each test.
   * Configures mocks for PokeApiService, ActivatedRoute, and Router, and initializes the component.
   */
  beforeEach(async () => {
    const pokeApiSpy = jasmine.createSpyObj('PokeApiService', ['getPokemonByNameOrId', 'getPokemonSpecies']);
    const activatedRouteStub = {
      snapshot: { paramMap: { get: () => '1' } }
    };
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, HttpClientTestingModule, PokemonDetailsPage],
      providers: [
        { provide: PokeApiService, useValue: pokeApiSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },
        FavoritesService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsPage);
    component = fixture.componentInstance;
    pokeApiService = TestBed.inject(PokeApiService) as jasmine.SpyObj<PokeApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    favoritesService = TestBed.inject(FavoritesService);
  });

  /**
   * Tests that the PokemonDetailsPage component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Tests that the component loads Pokémon details and species data on initialization.
   * Verifies that PokeApiService methods are called and component state is updated correctly.
   */
  it('should load pokemon details on init', () => {
    const mockPokemon = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'front.png' },
      height: 7,
      weight: 69,
      types: [{ type: { name: 'grass' } }],
      abilities: [{ ability: { name: 'overgrow' } }]
    };
    const mockSpecies = { habitat: { name: 'grassland' }, color: { name: 'green' } };

    pokeApiService.getPokemonByNameOrId.and.returnValue(of(mockPokemon));
    pokeApiService.getPokemonSpecies.and.returnValue(of(mockSpecies));

    component.ngOnInit();
    expect(pokeApiService.getPokemonByNameOrId).toHaveBeenCalledWith('1');
    expect(pokeApiService.getPokemonSpecies).toHaveBeenCalledWith('1');
    expect(component.pokemon).toEqual(mockPokemon);
    expect(component.species).toEqual(mockSpecies);
    expect(component.loading).toBeFalse();
  });

  /**
   * Tests that toggling a Pokémon's favorite status calls the appropriate FavoritesService methods.
   * Verifies that addFavorite and removeFavorite are called based on the isFavorite state.
   */
  it('should toggle favorite status', () => {
    component.pokemon = { id: 1 };
    spyOn(favoritesService, 'addFavorite');
    spyOn(favoritesService, 'removeFavorite');
    spyOn(favoritesService, 'isFavorite').and.returnValues(false, true);

    component.toggleFavorite();
    expect(favoritesService.addFavorite).toHaveBeenCalledWith(1);

    component.toggleFavorite();
    expect(favoritesService.removeFavorite).toHaveBeenCalledWith(1);
  });

  /**
   * Tests that the component navigates back to the parent route.
   * Verifies that the Router's navigate method is called with the correct relative path.
   */
  it('should navigate back', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['../'], { relativeTo: component.route });
  });
});
