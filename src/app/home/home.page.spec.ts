import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomePage } from './home.page';
import { PokeApiService } from '../services/poke-api.service';
import { FavoritesService } from '../services/favorites.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

/**
 * Test suite for the HomePage component.
 * Tests the component's creation, navigation, and favorite toggling functionality.
 */
describe('HomePage', () => {

    /** The HomePage component instance under test. */
    let component: HomePage;

    /** The ComponentFixture for the HomePage component. */
    let fixture: ComponentFixture<HomePage>;

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
        const pokeApiSpy = jasmine.createSpyObj('PokeApiService', ['getPokemonList']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), CommonModule, HttpClientTestingModule, HomePage],
            providers: [
                { provide: PokeApiService, useValue: pokeApiSpy },
                { provide: Router, useValue: routerSpy },
                FavoritesService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        pokeApiService = TestBed.inject(PokeApiService) as jasmine.SpyObj<PokeApiService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        favoritesService = TestBed.inject(FavoritesService);
    });

    /**
     * Tests that the HomePage component is created successfully.
     */
    it('should create', () => {
        expect(component).toBeTruthy();
    });

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
     * Tests that toggling a Pokémon's favorite status calls the appropriate FavoritesService methods.
     * Verifies that addFavorite and removeFavorite are called based on the isFavorite state.
     */
    it('should toggle favorite status', () => {
        const pokemon = { id: 25 };
        spyOn(favoritesService, 'addFavorite');
        spyOn(favoritesService, 'removeFavorite');
        spyOn(favoritesService, 'isFavorite').and.returnValues(false, true);

        component.toggleFavorite(pokemon);
        expect(favoritesService.addFavorite).toHaveBeenCalledWith(25);

        component.toggleFavorite(pokemon);
        expect(favoritesService.removeFavorite).toHaveBeenCalledWith(25);
    });
});
