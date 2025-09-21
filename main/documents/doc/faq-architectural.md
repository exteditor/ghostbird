[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / doc/faq-architectural

## FAQ (architectural)

### Why do some classes have `static isSingleton` property?

* [`root/startup.ts`][startup] scans for classes that have a `static isSingleton` property defined and instantiates them.
* See [About `startup.ts`](design.md) for details.

### Instantiate automatically? Doesn't it make the code harder to follow?

* Maybe, but it only automates the `new` calls. Constructors are still explicit about their dependencies.
* You can still search for type names mentioned in constructor parameters.

### Isn't it a bit hacky to use `static` properties?

* Yes. We might switch to decorators in the future when they become natively supported in Thunderbird.

### How do you find out what classes are instantiated?

* After running `yarn test`, `build/test/dependency_tree.mermaid` is generated, which shows the dependency tree of all classes with `static isSingleton` defined.

### How does automatic instantiation help with maintainability?

* It makes coding less boring by automating a necessary coding task that occurs often: passing objects around to call their methods. I like to think of it as being similar to generating a Makefile. It's not a panacea, but I think it has some effect to extend lifespan of the code until it becomes unmaintainable due to the scale.
* It nudges us to adhere to the [Dependency Inversion Principle][dip].

### How does DIP help with maintainability?

* It nudges us to write code with better testability.
* Testability helps ensure changes (say, to add a feature or adapt to Thunderbird API changes) don't break existing functionality. I sometimes unintentionally introduce such regressions or encounter them.
* It makes it easier to add workarounds and new features without modifying existing code.

### Dependency injection? Isn't DI over-engineered for a small project?

* Maybe, but I intend to maintain this project for a while, and this was the best solution I could devise to adapt to breaking Thunderbird API changes, which seem to [happen every few versions][tbchanges].
* Also, adding DI after the fact tends to be very hard.
* We might drop the autowiring thing and instantiate manually with `new` if the project ends up being stable enough. The practice of initializing everything in `startup.ts` would [still be useful][ploeh], though. It's possible to drop autowiring without [giving up DIP][ploeh2].

### It looks like not using a dependency injection library. Why are you reinventing the wheel?

* I tried some of those available on npm, but I couldn't find one that fits my taste.
* In any case, its use [must be limited][ploeh] to [`root/startup.ts`][startup] (which is one of the requirements that some DI libraries fail to meet).

[dip]: https://en.wikipedia.org/wiki/Dependency_inversion_principle
[tbchanges]: https://developer.thunderbird.net/add-ons/updating/tb128
[ploeh]: https://blog.ploeh.dk/2019/06/17/composition-root-location/
[ploeh2]: https://blog.ploeh.dk/2012/11/06/WhentouseaDIContainer/
[wiki]: https://github.com/exteditor/ghostbird/wiki
[issue]: https://github.com/exteditor/ghostbird/issues
[discussion]: https://github.com/exteditor/ghostbird/discussions
[startup]: ../../_media/startup.ts
