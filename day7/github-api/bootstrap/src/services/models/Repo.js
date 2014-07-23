GitHubStats.factory('Repo',
	function (GITHUB_API, CachableModel) {

		function Repo(config) {
			this.name = config.name;
			this.createdAt = config.created_at;
			this.forksCount = config.forks_count;
			this.language = config.language;
			this.starsCount = config.stargazers_count;
			this.url = config.url;
			this.fork = config.fork;
			this.htmlUrl = config.html_url;
		}

		Repo.getAllForUser = function(username){
			return CachableModel.get({
				url: GITHUB_API + '/users/{{username}}/repos',
				context: {username: username},
				isArray: true,
				constructor: Repo
			});
		}

		Repo.get = function(username, repo){
			var allRepos = Repo.getAllForUser(username);
			var targetRepo = allRepos.filter(function(r){return r.name === repo});
			if (targetRepo.length > 0){
				return targetRepo[0];
			}

			throw new Error("No repository with name: " + repo);
		}

		return Repo;
	});


